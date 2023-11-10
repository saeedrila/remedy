from django.db import models
from authentication.models import Account


class ChatMessage(models.Model):
    sender = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, related_name='sender')
    reciever = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, related_name="reciever")
    message = models.CharField(max_length=1000)
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date']
        verbose_name_plural = "Message"

    def __str__(self) -> str:
        return f"{self.sender} - {self.reciever}"
    
    @property
    def sender_profile(self):
        sender_profile = Account.objects.get(email=self.sender.email)
        return sender_profile
    @property
    def reciever_profile(self):
        reciever_profile = Account.objects.get(email=self.reciever.email)
        return reciever_profile
