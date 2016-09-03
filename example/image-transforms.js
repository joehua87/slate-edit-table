export const insertImage = (transform: Transform): Slate$Transform => (
  transform
    .insertBlock({
      type: 'image',
      isVoid: true,
      data: { src: 'https://facebook.github.io/react/img/logo.svg' },
    })
)
