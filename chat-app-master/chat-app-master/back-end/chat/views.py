import requests
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from chat.microservice import user_permission
from chat.models import (
    Conversation,
    Message
)
from chat.serializers import (
    ConversationListSerializer,
    ConversationSerializer, MessageSerializer, MessageListSerializer
)

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


class StartConversationView(APIView):
    filter_backends = [SearchFilter]
    search_fields = ['username']

    BASE_URL = "https://api.prounity.uz/auth/users"

    def make_request(self, url, request):
        try:
            headers = {'Authorization': request.headers.get('Authorization')}
            
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            return {"error": str(e)}

    @user_permission
    def get(self, request, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)
        url = f"{self.BASE_URL}"
        data = self.make_request(url, request)

        username = request.query_params.get("username", None)
        if not username:
            return Response([], status=status.HTTP_200_OK)
        queryset = self.filter_queryset(data.get("results", []), username)

        if not queryset:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(queryset, status=status.HTTP_200_OK)

    @user_permission
    def post(self, request, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)
        url = f"{self.BASE_URL}"
        data = self.make_request(url, request)
        d = request.data

        username = d.get("username", None)
        queryset = self.filter_queryset(data.get("results", []), username)

        if not queryset:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        participant = queryset[0]
        conversation = self.get_or_create_conversation(usr, participant['username'])
        return conversation

    def filter_queryset(self, data, username):
        return [user for user in data if not username or username.lower() in user.get("username", "").lower()]

    def get_or_create_conversation(self, usr, participant_id):
        conversation = Conversation.objects.filter(Q(initiator=usr, receiver=participant_id) |
                                                   Q(initiator=participant_id, receiver=usr))

        if conversation.exists():
            return Response({"message": "Conversation already exists"}, status=status.HTTP_302_FOUND)
        else:
            conversation = Conversation.objects.create(initiator=usr, receiver=participant_id)
            return Response(ConversationSerializer(instance=conversation).data, status=status.HTTP_200_OK)


class GetConversationView(APIView):
    filterset_fields = ["text"]

    @user_permission
    def get(self, request, convo_id, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)

        text = request.query_params.get("text", None)
        if text:
            conversation = Message.objects.select_related('conversation_id').filter(
                Q(conversation_id=convo_id), Q(text__icontains=text)
            )
            page = self.paginate_queryset(conversation)
            serializer = MessageListSerializer(conversation, many=True, context={'request': request})

            return Response(serializer.data, status=status.HTTP_200_OK)

        conversation = get_object_or_404(Conversation, id=convo_id)
        messages = conversation.message_set.all()  # Retrieve all messages for the conversation
        # page = self.paginate_queryset(messages)
        serializer = ConversationSerializer(conversation, context={'request': usr})
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetConversationView(APIView):
    filterset_fields = ["text"]

    @user_permission
    def get(self, request, convo_id, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)

        text = request.query_params.get("text", None)
        if text:
            conversation = Message.objects.select_related('conversation_id').filter(
                Q(conversation_id=convo_id), Q(text__icontains=text)
            )
            page = self.paginate_queryset(conversation)
            serializer = MessageListSerializer(conversation, many=True, context={'request': usr})

            return Response(serializer.data, status=status.HTTP_200_OK)

        conversation = get_object_or_404(Conversation, id=convo_id)
        messages = conversation.message_set.all()  # Retrieve all messages for the conversation
        # page = self.paginate_queryset(messages)

        serializer = ConversationSerializer(conversation, context={'request': usr})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @user_permission
    def put(self, request, convo_id, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)
        conversation = get_object_or_404(Conversation, id=convo_id)
        serializer = MessageSerializer(data=request.data, context={
            "request": usr,
            "conversation": conversation
        })
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationView(APIView):

    @user_permission
    def get(self, request, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)

        conversation_list = Conversation.objects.filter(Q(initiator=usr) |
                                                        Q(receiver=usr))
        serializer = ConversationListSerializer(instance=conversation_list, many=True, context={"request": usr})
        # serializer = super().page(conversation_list, ConversationListSerializer, request)

        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteChatSMSView(APIView):

    def delete(self, request, pk, user_id=None, usr=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_401_UNAUTHORIZED)
        queryset = get_object_or_404(Message, id=pk).delete()
        return Response({'msg': "Message Deleted successfully"}, status=status.HTTP_200_OK)
