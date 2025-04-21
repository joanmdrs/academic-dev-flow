from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    user = reset_password_token.user
    token = reset_password_token.key

    # Crie aqui o link de redefinição conforme sua URL
    link_redefinicao = f"http://localhost:3000/academicflow/redefinir-senha/confirmar/{token}"

    context = {
        'email': user.email,
        'token': token,
        'link_redefinicao': link_redefinicao,
    }

    html_content = render_to_string('emails/reset_password.html', context)

    email = EmailMultiAlternatives(
        subject="Redefinição de senha",
        body="Recebemos uma solicitação de redefinição de senha.",  # Fallback para leitores que não suportam HTML
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[user.email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
