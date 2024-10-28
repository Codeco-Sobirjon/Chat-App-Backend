from django.urls import path

from chat.views import (
    StartConversationView,
    ConversationView,
    GetConversationView,
    DeleteChatSMSView,
)

urlpatterns = [
    # create room
    path('create_room', StartConversationView.as_view(), name='start_convo'),
    # get room on initiator and receiver
    path('rooms', ConversationView.as_view(), name='conversations'),
    # get conversation  all messages
    path('conversation/<int:convo_id>', GetConversationView.as_view(), name='get_conversation'),

    path('message_delete/<int:pk>', DeleteChatSMSView.as_view()),


]
