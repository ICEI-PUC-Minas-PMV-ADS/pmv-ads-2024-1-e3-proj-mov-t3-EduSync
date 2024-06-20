module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'], // Defina a raiz como a pasta 'src'
          alias: {
            '@services': './Service', // Corrija o caminho relativo ao root
            // adicione mais aliases conforme necessário
          },
        },
      ],
    ],
  };
};
