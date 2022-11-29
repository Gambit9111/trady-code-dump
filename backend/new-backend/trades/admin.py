from django.contrib import admin

from .models import Trade

class TradeAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "symbol",
        "type",
        "quantity",
        "leverage",
        "entry_date",
        "entry_price",
        "exit_date",
        "exit_price",
        "pnl",
        "status",
    )
    list_filter = (
        "user",
        "symbol",
        "type",
        "quantity",
        "leverage",
        "entry_date",
        "entry_price",
        "exit_date",
        "exit_price",
        "pnl",
        "status",
    )
    search_fields = (
        "user",
        "symbol",
        "type",
        "quantity",
        "leverage",
        "entry_date",
        "entry_price",
        "exit_date",
        "exit_price",
        "pnl",
        "status",
    )

admin.site.register(Trade, TradeAdmin)