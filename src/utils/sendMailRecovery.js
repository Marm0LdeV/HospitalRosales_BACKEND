const HTMLRecoveryEmail = (code) => `
<div style= "font-family: sans-serif; text-align: center;
padding: 20px, max-width: 500px; border: 1px solid #ddd;>
<h2 style= "display:inline-block; padding: 10px 20px;
font-weight: bold; color: #fff; background: #ff8f50;
border-radius: 5px;">
${code}
</div>
<p style= "font-size:12px; color: #777;">
Valido por 15 minutos. Si no solicitaste este correo, ignoralo.
</p>
<hr>
<footer style= "font-size: 10px; color #aaa;">
Support: support@eaxmple.com
</footer>
</div>
`; 

export default HTMLRecoveryEmail;