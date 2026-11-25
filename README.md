# 🟨 MoodPixels

> **Cada dia tem uma cor. Cada mês conta uma história.**

![versão](https://img.shields.io/badge/versão-1.1_PWA-F2C94C?style=for-the-badge)
![feito com](https://img.shields.io/badge/feito_com-HTML_·_CSS_·_JS-7BC47F?style=for-the-badge)
![PWA](https://img.shields.io/badge/app-PWA_instalável-EA639B?style=for-the-badge)
![offline](https://img.shields.io/badge/dados-100%25_locais-5B9BD5?style=for-the-badge)

```
 ☀️  ⛅  ☁️  🌧️  ⛈️  🌫️
 ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮
```

## 🎮 O que é

O **MoodPixels** é um diário visual de humor em **pixel art**. Em vez de escrever textos, você registra o seu dia com apenas três escolhas:

- 🎨 **Uma cor** que represente o seu dia
- ⛅ **Um clima** simbólico (sol, nuvens, chuva, tempestade, neblina)
- 📶 **Uma intensidade**, de 1 a 5

Ao longo dos dias, essas escolhas formam um calendário de pixels. No fim do mês, o app transforma os registros em uma **arte abstrata gerada a partir dos seus próprios dados**.

> Esta é a **primeira versão (protótipo)** do projeto. O app é funcional, mas ainda vai evoluir.

## ✨ Funcionalidades

| | Recurso | O que faz |
|---|---|---|
| 📝 | **Registro diário** | Escolha clima, cor e intensidade em poucos toques |
| 🗓️ | **Calendário de pixels** | Cada dia é um quadradinho com a cor escolhida |
| 🖼️ | **Gerador de arte mensal** | Transforma o mês em uma composição visual única |
| 📊 | **Estatísticas** | Cor e clima mais frequentes, intensidades e mais |
| 💾 | **Backup em JSON** | Exporte os seus registros quando quiser |
| 🔤 | **Ícones personalizados** | Escolha uma letra de A a Z e uma cor da paleta |

## 🕹️ Como usar

**Instalar como app (PWA)**
1. Abra a página publicada no GitHub Pages.
2. **Android/Chrome:** menu do navegador → *Instalar app*, ou *Configurações → Instalar app* dentro do MoodPixels.
3. **iPhone/Safari:** Compartilhar → *Adicionar à Tela de Início*.
4. **Windows/Mac (Chrome ou Edge):** ícone de instalar na barra de endereço.

**Rodar localmente**
Sirva a pasta com qualquer servidor estático (o service worker exige `http://localhost` ou HTTPS), por exemplo `python -m http.server 8000`, e abra `http://localhost:8000`.

> 💡 Depois do primeiro acesso, o app funciona offline. As fontes pixeladas do Google Fonts ficam em cache; sem elas, o app usa as fontes padrão do sistema.

## 🧱 Estrutura do projeto

```
├── index.html            → estrutura da página e registro do service worker
├── style.css             → identidade visual em pixel art
├── app.js                → lógica, sprites, calendário, estatísticas e arte
├── manifest.webmanifest  → nome, cores e ícones do app instalado
├── sw.js                 → service worker (cache offline)
├── icons/                → ícones do app
├── .github/workflows/    → publicação automática no GitHub Pages
└── README.md             → você está aqui
```

> Ao publicar mudanças, aumente o `VERSION` em `sw.js` para que quem já instalou receba a versão nova.

## 🔒 Privacidade

Seus registros, conta e avatar ficam salvos **apenas no navegador** do seu dispositivo (`localStorage`). Nada é enviado para servidores.

Para não perder nada, use **Configurações → Exportar JSON** e guarde o backup.

## 🛠️ Tecnologias

- **HTML5** para a estrutura
- **CSS3** para o visual
- **JavaScript** puro, sem frameworks
- **Canvas** para sprites e para a arte do mês
- **localStorage** para guardar os dados

## 🚧 Próximos passos

- [ ] Mais camadas e detalhes na arte mensal
- [ ] Mais opções de personalização visual
- [x] Versão instalável como PWA
- [ ] Versão como aplicativo Android nativo

## 👾 Autor

Feito por **Luccas Lima Barboza** · Projeto acadêmico

---

<sub>MoodPixels · v1.1 · PWA 🟨🟦🟩🟪</sub>
