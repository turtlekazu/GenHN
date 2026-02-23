# GenHN

| [English](README.md) | 日本語 |
|:---:|:---:|

生成UI (Generative UI) [Hacker News](https://news.ycombinator.com) クライアント。動的にビジュアルDNAを生成し、Hacker Newsのインターフェースを再構築する、実験的プロジェクトです。特徴的なプロダクトのデザインシステムをモチーフにしたプリセットのテーマを用意しました。Gemini APIキーを入れれば、好きなテーマをすぐに生成することもできます。また、ChatGPT・Claude・Geminiなどの外部生成AIにテンプレートプロンプトを渡してCSSを生成し、そのままペーストするだけでビジュアルを切り替えることも可能です。

**[Live Demo](https://turtlekazu.github.io/GenHN/)**

![genhn](https://github.com/user-attachments/assets/75e0b0a8-bf25-4e8b-9e0e-aae6fa11d258)

## 特徴

- **12種類のデザインプリセット**: アイコニックなブランド美学にインスパイアされたデザインシステムをワンクリックで切り替え。
- **AIテーマ生成**: Gemini APIキーを登録すると、自由記述のプロンプトからまったく新しいデザインテーマをその場で生成可能。
- **Paste CSS**: 外部のAIツールで生成したCSSをそのまま貼り付けて即時適用。適用したテーマはカスタムプリセットとして保存も可能。
- **AIプロンプトテンプレート**: APIキー不要でも使える、ChatGPT・Claude・Gemini向けのテーマ生成プロンプトをワンクリックでコピー。
- **フィードナビゲーション**: Top / New / Ask / Show / Jobs など、Hacker Newsの各フィードを切り替え可能。
- **HNリアルタイムデータ**: Hacker News Firebase APIから実際の記事を取得（1ページ30件、"More"ボタンで追加読み込み）。
- **ビルド不要**: 純粋なバニラJS + CSS。`index.html`をブラウザで直接開くだけで動作。
- **ビュートランジション**: View Transition APIによるスムーズなページ遷移（非対応ブラウザでも graceful fallback）。

## 使い方

1. `index.html` をブラウザで開きます。
2. 右下のパネルにあるプリセットボタンをクリックして、ビルトインテーマを適用します。
3. ヘッダーのナビゲーションリンクでHNフィードを切り替えます（Top / New / Ask / Show / Jobs）。

## 利用可能なデザインエッセンス

各プリセットテーマには、実在するプロダクトのデザイン言語へのオマージュが込められています。いくつ当てられるか、試してみてください。

| テーマ | 説明 |
|--------|------|
| **Minimalist** | グラスモーフィズムヘッダー、クリーンなタイポグラフィ、繊細なカードシャドウを備えたソフトな白ベース。 |
| **Intelligence** | ほぼ黒の背景にエメラルドグリーンのアクセント、モノスペースロゴ、点滅カーソル——AIチャットインターフェース風。 |
| **Search** | 純白のクリーンなレイアウトと青いリンクスタイルのタイトル。クラシックな検索エンジン美学。 |
| **Universal** | 角丸の大胆なカードグリッドと強いブルーアクセント。親しみやすく、高い視認性。 |
| **Glitch** | 黒背景にネオンイエローのテキスト、シアンのサブテキスト、CRTスキャンラインオーバーレイ、多角形クリップのカード。 |
| **Playful** | ライトグレーの背景に赤ヘッダー、太い黒ボーダー、ゲーム機UIを思わせるカードグリッド。 |
| **Glow** | ディープネイビーに放射状ブルーグラデーション、光るネオンロゴ、半透明カード——次世代コンソール風。 |
| **Academic** | 暖かみのあるクリーム背景、セリフ体タイポグラフィ、テラコッタアクセント。落ち着いた読書体験。 |
| **Washi** | 柔らかな和紙風クリームトーン、深い森の緑、日本語明朝体フォント——手描き・水彩画のような温かみ。 |
| **Circuit** | ディープグリーンのPCBグリッド背景、ゴールドのコネクタタブ、ロゴのLED点滅——ハードウェア・メイカー風。 |
| **Aubergine** | ディープオーバジン（茄子色）の背景とウォームオレンジのアクセント、太いカードグリッド、デスクトップOS風タイポグラフィ。 |
| **8-Bit** | 漆黒の背景に燐光グリーンのターミナルテキスト、シアンのアクセント、等幅フォント、ピクセル描画——レトロPC・ゲーム機風。 |

| Minimalism | Intelligence | Search |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/0603ca7a-be6b-464a-be30-c7e2de7eeda2" width="512px" /> | <img src="https://github.com/user-attachments/assets/ac751806-6dd6-4f16-8515-85335ceb4fcf" width="512px" /> | <img src="https://github.com/user-attachments/assets/2d07f6f9-68f2-4e04-adcf-41c5ea0c66a2" width="512px" /> |

| Universal | Glitch | Playful |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/9b73c8fb-c541-4ce2-9c7d-d60919b6ee34" width="512px" /> | <img src="https://github.com/user-attachments/assets/12377a18-cbf6-42e1-851d-b4590a217b10" width="512px" /> | <img src="https://github.com/user-attachments/assets/7eea56ed-c987-4caa-8179-14c8e07df07f" width="512px" /> |

| Glow | Academic | Washi |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/ec261baf-74d3-40dc-8045-3c822fc530c8" width="512px" /> | <img src="https://github.com/user-attachments/assets/752bb862-b3c5-435b-8caf-8ca4d735f910" width="512px" /> | <img src="https://github.com/user-attachments/assets/e64950a9-0682-4d2f-946d-0ea6c9b926af" width="512px" /> |

| 8-bit | Circuit | Aubergine |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/1c177f6a-aaad-494b-9244-fa9b26057ef0" width="512px" /> | <img src="https://github.com/user-attachments/assets/6a30b550-55ad-4b82-a304-ae0ed842a21f" width="512px" /> | <img src="https://github.com/user-attachments/assets/389fdba3-70bd-4747-a732-cc660475efce" width="512px" /> |

## アーキテクチャ

アプリケーション全体は2つのファイルで構成されています。

- **`index.html`** — 静的なDOM構造（ヘッダー、記事リスト、コントロールパネル）。
- **`gardener.js`**（約1,300行）— すべてのアプリケーションロジック：
  - `SYSTEM_STYLE` — ベースCSS（レイアウト、グラスモーフィズム、レスポンシブデザイン）。
  - `STYLE_PRESETS` — CSSカスタムプロパティによるテーマ定義。
  - `HNData` — Hacker News API連携（フィード取得、ページネーション）。
  - `App` — メインコントローラー（テーマ適用、レンダリング、イベント処理、localStorage永続化）。

## AIによるテーマ生成（Gemini API）

[Gemini API](https://aistudio.google.com/apikey) を使って、プロンプトからリアルタイムに新しいテーマを生成できます。

1. [Google AI Studio](https://aistudio.google.com/apikey) で無料のAPIキーを取得します。
2. コントロールパネル（右下）を開き、**Generate (Gemini API)** セクションを展開します。
3. APIキーを貼り付けて **Save Key** をクリック。キーはブラウザの localStorage にのみ保存され、Gemini API以外には送信されません。ページをリロードしてもキーは保持されます。APIキーの管理は自己責任でお願いします。
4. プロンプト入力欄に任意のデザインコンセプトを入力（例：`"brutalist newspaper"`、`"cozy dark cafe"`）し、**Apply** をクリックします。

アプリが `gemini-2.5-flash` を呼び出し、プロンプトからCSSテーマを生成してページリロードなしで即座に適用します。

## Paste CSS（外部AIを使ったワークフロー）

APIキーがなくても、外部のAIツールでテーマを生成してCSSを直接貼り付けることができます。

1. コントロールパネルの **AI Prompt Template** セクションを開き、**Copy Prompt** をクリック。
2. コピーしたプロンプトをChatGPT・Claude・Geminiなどに貼り付け、括弧内の行を自分のテーマアイデアに置き換えます。
3. AIが返したCSSをコピーします。
4. コントロールパネルの **Paste CSS** セクションにCSSを貼り付け、**Apply** をクリック。
5. 必要に応じて **Save as Preset** をクリックすると、カスタムプリセットボタンとして保存・再利用できます。

## 手動で新しいテーマを追加するには

`gardener.js` 内の `STYLE_PRESETS` に、既存のパターンに倣って新しいエントリを追加します。各テーマはCSSカスタムプロパティをオーバーライドし、必要に応じてコンポーネント固有のスタイルを追加できます。

## コントリビューション

Pull Request 歓迎です！新しいテーマ、バグ修正、機能のアイデアなど、お気軽に Issue や PR をお送りください。

## 注意事項

このプロジェクトはデザインの実験を目的としており、既存のいかなるブランドとも直接の関係はありません。商標およびブランドの直接的な表現は排除されています。

## ライセンス

[MIT](LICENSE)
