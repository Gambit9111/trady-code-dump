from django.db import models
from django.conf import settings
import datetime
from decimal import Decimal

TYPE_CHOICES = (
    ('long', 'Long'),
    ('short', 'Short'),
)

STATUS_CHOICES = (
    ('open', 'Open'),
    ('closed', 'Closed'),
)

class Trade(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    leverage = models.IntegerField()
    entry_date = models.DateTimeField()
    entry_price = models.DecimalField(max_digits=10, decimal_places=2)
    exit_date = models.DateTimeField(null=True, blank=True)
    exit_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pnl = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='open')

    def close(self, exit_price):
        self.exit_price = exit_price
        self.exit_date = datetime.datetime.now()
        self.pnl = (self.exit_price - self.entry_price) * self.quantity * self.leverage
        self.status = 'closed'
        self.save()
    
    def __str__(self):
        return self.user.email + " " + self.symbol + " " + self.type + " " + str(self.entry_date) + " " + str(self.entry_price)