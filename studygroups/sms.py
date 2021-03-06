from django.conf import settings

import twilio
import twilio.rest

def send_message(to, body):
    client = twilio.rest.TwilioRestClient(
        settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN 
    )
    try:
        message = client.messages.create(
            body=body,
            to=to,
            from_=settings.TWILIO_NUMBER
        )
    except twilio.TwilioRestException as e:
        #messages.warning(request, 'Could not send SMS to ' + to)
        raise e

