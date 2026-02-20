# Generative Hacker News (Acephale Garden)

## Project Overview
**Generative Hacker News** は、Hacker Newsのインターフェースを様々な企業ブランドのデザインシステム（Generative UI）に動的に変換する実験的なプロジェクトです。
Acephale OSのコンセプトに基づき、UIを固定されたものではなく「生成され、入れ替え可能なもの」として扱います。

## Core Features
- **Real-time HN Integration**: Hacker News APIを使用して最新のトップ記事を動的に取得。
- **Brand Identity Swap**: Apple, Google, Samsung, Cyberpunk 2077といった象徴的なブランドの「らしさ」をCSSインジェクションで即座に適用。
- **Infinite Scrolling**: 「More」ボタンにより、本家のページネーションではなく、カードが積み重なっていくモダンな無限スクロール体験を提供。
- **Sticky Footer**: 各ブランドのデザイン言語に合わせたレスポンシブなフッターレイアウト。

## Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript (ES6+).
- **Styling**: Dynamic CSS Injection via JavaScript.
- **API**: Hacker News Firebase API.
- **No Build Step**: 依存関係なし、ブラウザで直接動作。

## Key Files
- **`index.html`**: アプリケーションの骨格。テーマ制御用のフローティングUIとHNのデータ表示領域を提供。
- **`gardener.js`**: 
    - 各ブランドのCSSプリセット（STYLE_PRESETS）を保持。
    - HN APIからのデータ取得とフォーマッティング（HNData）。
    - DOM操作とイベント管理（App）。

## Available Themes (Keywords)
右下のプロンプト入力欄に以下のキーワードを入力して適用します：
- `Apple`: 洗練された透明感とSF Proタイポグラフィ。
- `Google`: Material DesignとProduct Sans風の清潔なUI。
- `Samsung`: One UI風の大きな角丸カード。
- `Cyberpunk 2077`: 鮮烈なイエローとグリッチ感のあるブラックデザイン。

## Development Status
- **Current State**: 安定したプロトタイプ。リアルデータ連携および主要ブランドの実装完了。
- **Future Plans**: 記事詳細（コメント）の表示機能、さらなるブランド（Nintendo, Sony, etc.）の追加。
