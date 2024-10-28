import base64
import json
import secrets
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from django.core.files.base import ContentFile
from chat.models import Message, Conversation
from chat.serializers import MessageSerializer
from django.core.exceptions import ObjectDoesNotExist
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        # Join room group
        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)

    def receive(self, text_data=None, bytes_data=None):
        # Parse the JSON data into a dictionary object
        text_data_json = json.loads(text_data)

        # Unpack the dictionary into the necessary parts
        message, attachment = text_data_json["message"], text_data_json.get("attachment")

        # Check if the conversation exists
        try:
            conversation = Conversation.objects.get(id=int(self.room_name))
        except ObjectDoesNotExist:
            # Handle the case where the conversation does not exist
            print(f"Conversation with ID {self.room_name} does not exist.")
            return
        sender = self.scope["user"]
        if attachment:
            file_str, file_ext = attachment["data"], attachment["format"]
            file_data = ContentFile(base64.b64decode(file_str), name=f"{secrets.token_hex(8)}.{file_ext}")
            _message = Message.objects.create(sender=sender, attachment=file_data, text=message, conversation_id=conversation)
        else:
            _message = Message.objects.create(sender=sender, text=message, conversation_id=conversation)

        # Send message to room group
        chat_type = {"type": "chat_message"}

        message_serializer = dict(MessageSerializer(_message, context={'request': self.scope["user"]}).data)
        return_dict = {**chat_type, **message_serializer}
        # Create the message with the determined type
        if _message.attachment:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message,
                    "sender": sender.email,
                    "attachment": _message.attachment.url,
                    "time": str(_message.timestamp),
                },
            )
        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                 {**return_dict},  # Assign sender and receiver type here
            )
        
        
    # Receive message from room group
    def chat_message(self, event):
        dict_to_be_sent = event.copy()
        dict_to_be_sent.pop("type")

        # Send message to WebSocket
        self.send(
            text_data=json.dumps(
                dict_to_be_sent
            )
        )


class ChatMessage(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()
        # await self.get_and_send_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )
    
    async def chat_message(self, event):
        dict_to_be_sent = event.copy()
        dict_to_be_sent.pop("type")
        sender = self.scope["user"]
        if dict_to_be_sent['sender'] == sender:
            print('init')
            dict_to_be_sent['sender_type'] = 'initiator'
        else:
            print('res')
            dict_to_be_sent['sender_type'] = 'receiver'
        await self.send(text_data=json.dumps(dict_to_be_sent))
