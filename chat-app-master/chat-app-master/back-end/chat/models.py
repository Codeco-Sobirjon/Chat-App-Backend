from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Conversation(models.Model):
    initiator = models.CharField(max_length=250, null=True, blank=True)
    receiver = models.CharField(max_length=250, null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True, verbose_name='Time stamp', null=True, blank=True)

    class Meta:
        db_table = "table_conversation"
        verbose_name = "Conversation"
        verbose_name_plural = "Conversation"

class Message(models.Model):
      sender = models.CharField(max_length=250, null=True, blank=True)
      text = models.CharField(max_length=200, blank=True, verbose_name='Text')
      attachment = models.FileField(blank=True, null=True, verbose_name='File Uploaded')
      conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE, verbose_name='Conversation Identity', null=True, blank=True)
      timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Time stamp', null=True, blank=True)
      is_read = models.BooleanField(default=False, verbose_name='Is Read')  # New field for read status

      
      class Meta:
            ordering = ('-timestamp',)
            db_table = "table_Message"
            verbose_name = "Message"
            verbose_name_plural = "Message"


# Create your models here.
# class Conversation(models.Model):
#     initiator = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='convo_starter')
#     receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='convo_participant')
#     start_time = models.DateTimeField(auto_now_add=True, verbose_name='Time stamp', null=True, blank=True)

#     class Meta:
#         db_table = "table_conversation"
#         verbose_name = "Conversation"
#         verbose_name_plural = "Conversation"


# class Message(models.Model):
#       sender = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='message_sender')
#       text = models.CharField(max_length=200, blank=True, verbose_name='Text')
#       attachment = models.FileField(blank=True, null=True, verbose_name='File Uploaded')
#       is_read = models.BooleanField(default=False)
#       conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE, verbose_name='Conversation Identity', null=True, blank=True)
#       timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Time stamp', null=True, blank=True)

#       class Meta:
#             ordering = ('-timestamp',)
#             db_table = "table_Message"
#             verbose_name = "Message"
#             verbose_name_plural = "Message"



