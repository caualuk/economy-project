Instruções para adicionar a fonte Geist

Opções:

1. Usar o pacote NPM (`@fontsource`)

- Já existem importações em `app/globals.css` que usam:
  @fontsource/geist-sans/variable.css
  @fontsource/geist-mono/variable.css
- Para instalar (se ainda não):

```bash
npm install @fontsource/geist-sans @fontsource/geist-mono
```

2. Auto-hospedar os arquivos de fonte

- Coloque seus arquivos `.woff2`/`.woff` em `public/fonts/` com nomes como:
  - Geist-Regular.woff2
  - Geist-Medium.woff2
  - Geist-Bold.woff2
  - GeistMono-Regular.woff2
- Substitua ou adicione um `@font-face` em `app/globals.css` apontando para `/fonts/Geist-Regular.woff2` etc.

Exemplo `@font-face` (auto-hospedada):

```css
@font-face {
  font-family: "Geist";
  src: url("/fonts/Geist-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

3. Uso e fallback

- `app/globals.css` já define variáveis e usa `var(--font-sans)` como primeiro valor para o `body`.
- A pilha de fallback inclui `Geist` seguida por `system-ui`, `-apple-system`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `Noto Sans`, `sans-serif`.

Notas:

- Se preferir CDN, adicione o link do CSS/CDN no `<head>` ou importe no `globals.css`.
- Após adicionar/alterar fontes, reinicie o servidor de desenvolvimento para garantir o cache atualizado.
