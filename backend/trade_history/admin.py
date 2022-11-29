from django.contrib import admin

from .models import Trading_account, Trade


class Trading_accountAdmin(admin.ModelAdmin):
    list_display = ("user", "label", "balance")
    list_filter = ("user", "label", "balance")
    search_fields = ("user", "label", "balance")


class TradeAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "account",
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
        "account",
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
        "account",
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

admin.site.register(Trading_account, Trading_accountAdmin)
admin.site.register(Trade, TradeAdmin)