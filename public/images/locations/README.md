# Imagens dos Locais

Este diretório deve conter as imagens reais dos locais de Campinas.

## Estrutura

Cada local deve ter seu próprio subdiretório com suas imagens:

```
/locations/
  /lagoa-taquaral/
    main.jpg
    gallery-1.jpg
    gallery-2.jpg
    gallery-3.jpg
  /mercado-municipal/
    main.jpg
    gallery-1.jpg
    gallery-2.jpg
    gallery-3.jpg
  ...
```

## Como usar

Atualize o arquivo `lib/data.ts` para usar as imagens locais:

```typescript
images: [
  '/images/locations/lagoa-taquaral/main.jpg',
  '/images/locations/lagoa-taquaral/gallery-1.jpg',
  '/images/locations/lagoa-taquaral/gallery-2.jpg',
]
```

## Notas

- Use imagens de alta qualidade (mínimo 800x600px)
- Formato preferencial: JPG ou WebP
- Mantenha os nomes dos arquivos em minúsculas com hífens
- O sistema já possui fallback automático caso a imagem não carregue
