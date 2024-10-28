from django.urls import path
from chat.consumers import (
    ChatConsumer,
    ChatMessage,

)


websocket_urlpatterns = [
    path('ws/chat/<int:room_name>/', ChatConsumer.as_asgi()),
    path('ws/message/<int:room_name>/', ChatMessage.as_asgi()),

]