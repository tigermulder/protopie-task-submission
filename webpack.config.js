const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/machine.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 빌드 전 dist 폴더 정리
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Babel 프리셋 설정
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', // CSS를 스타일로 DOM에 삽입
          'css-loader', // CSS 파일을 모듈로 해석
          'postcss-loader', // PostCSS와 Autoprefixer 사용
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i, // 이미지 파일에 대해
        type: 'asset/resource', // 이미지 파일을 리소스로 처리
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'docs', to: 'docs' } // docs 폴더를 dist/docs 폴더로 복사
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
      },
    ],
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
  mode: 'development', // 개발 모드
};
