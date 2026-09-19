# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以純前端技術實作，讓使用者可以管理日常待辦事項，並透過瀏覽器的 `localStorage` 保留資料與主題偏好。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將上方網址中的佔位文字替換成實際的 GitHub 帳號與 repository 名稱。

## 功能

- 新增待辦事項，空白內容不會被加入清單。
- 勾選待辦事項並標記為完成，完成項目會顯示刪除線與淡化效果。
- 逐筆刪除待辦事項。
- 一次清除所有已完成項目，執行前會顯示瀏覽器確認對話框。
- 沒有已完成項目時，自動停用「清除已完成」按鈕。
- 顯示整體清單的未完成項目數量。
- 清單為空或篩選結果為空時，顯示對應提示文字。
- 提供「全部」、「未完成」與「已完成」三種篩選模式。
- 支援淺色模式與深色模式切換。
- 未手動設定主題時，會跟隨作業系統的 `prefers-color-scheme` 設定。
- 保存待辦資料與主題偏好，重新整理頁面後仍可保留。
- 透過響應式版面支援手機螢幕。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用框架、第三方套件或外部 CDN。
- 使用 CSS 變數集中管理配色，並以 CSS media query 支援系統深色模式。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好。
- 使用原生 DOM API 建立與更新待辦清單。

## 開發方式

這個專案是在 GitHub Copilot 實戰工作坊中，搭配以下工具與流程完成：

- **GitHub Copilot Agent Mode**：根據需求建立待辦清單，並協助逐步實作功能與驗證行為。
- **MCP**：連接 Microsoft Learn 文件工具查詢 `prefers-color-scheme` 與色彩對比無障礙建議，也使用 GitHub 工具讀取 repository issue。
- **`.github/prompts` agentic workflow**：透過 `fix-issue.prompt.md` 定義從讀取 issue、提出計畫、建立分支、修改、驗證、提交推送到建立 Pull Request 的固定流程。
- **GitHub issue 與 Pull Request**：以 issue 描述需求，依照工作流程在獨立分支完成修改並建立 PR。

## 我學到什麼

- 如何使用 Agent Mode 將自然語言需求拆解成可執行的前端工作。
- 如何透過 MCP 查詢官方技術文件與 GitHub repository 資訊，讓實作決策有可靠依據。
- 如何使用 CSS 變數與 `prefers-color-scheme` 建立可切換且具備系統偏好支援的主題。
- 如何用 GitHub issue、分支、commit 與 Pull Request 管理功能開發流程。
- 如何把重複的 issue 修正流程整理成可重複使用的 agentic workflow。
