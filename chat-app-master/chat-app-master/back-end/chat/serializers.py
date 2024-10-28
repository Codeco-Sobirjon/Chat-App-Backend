from rest_framework import serializers
from chat.models import Conversation, Message
from chat.microservice import user_permission



class MessageSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=True)
    # sender_type = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', "sender", 'text', 'conversation_id', "is_read", 'timestamp']

    def create(self, validated_data):
        sender = self.context.get('request')
        conversation = self.context.get('conversation')

        create_message = Message.objects.create(**validated_data)
        create_message.sender = sender
        create_message.conversation_id = conversation
        create_message.save()
        return create_message

    def get_sender_type(self, obj):
        user = self.context.get('request')
        sender = obj.sender
        if sender:
            return 'ini' 
        else:
            return 'res'

    

class ConversationListSerializer(serializers.ModelSerializer):
    sender_type = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'initiator', 'receiver', 'sender_type']

    def get_sender_type(self, obj):
        user = self.context.get('request')
        if user:
            
            if obj.initiator == user:
                return obj.receiver 
            elif obj.receiver == user:
                return obj.initiator
        return None

    

class MessageListSerializer(serializers.ModelSerializer):
    sender_type = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'text', "is_read", 'timestamp', 'sender_type']
    
    def get_sender_type(self, obj):
        user = self.context.get('request')
        sender = obj.sender
        conversation = obj.conversation_id
        if user==sender:
            if user == conversation.initiator:
                return 'initiator'
            elif user == conversation.receiver:
                return 'initiator'
        return 'receiver'


class ConversationSerializer(serializers.ModelSerializer):
    message_set = MessageListSerializer(many=True)
    sender_type = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'initiator', 'receiver', 'message_set', 'sender_type']
    
    def get_sender_type(self, obj):
        user = self.context.get('request')
        if user:
            if obj.initiator == user:
                return obj.receiver 
            elif obj.receiver == user:
                return obj.initiator
        return None