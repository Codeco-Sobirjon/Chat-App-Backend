from django.contrib import admin
from chat.models import Conversation, Message

admin.site.register(Message)
admin.site.register(Conversation)