import React, { useEffect, useRef } from 'react'

let tvScriptLoadingPromise = []

const TVChart = ({ rowId, columnId, height }) => {
  const onLoadScriptRef = useRef()

  useEffect(() => {
    onLoadScriptRef.current = createWidget
    let pointer = null
    const key = rowId + '-' + columnId

    if (
      tvScriptLoadingPromise.find((x) => x.key === rowId + '-' + columnId) ===
      undefined
    ) {
      pointer = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve

        document.head.appendChild(script)
      })
      tvScriptLoadingPromise.push({ key: key, value: pointer })
    }
    if (pointer) {
      pointer.then(() => onLoadScriptRef.current && onLoadScriptRef.current())
    }

    return () => (onLoadScriptRef.current = null)

    function createWidget() {
      //Tej funkcji nie da się zmienić na strzałkową
      const key = rowId + '-' + columnId
      if (
        document.getElementById('tradingview_' + key) &&
        'TradingView' in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'NASDAQ:AAPL',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'pl',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          container_id: 'tradingview_' + key,
        })
      }
    }
  }, [])

  return (
    <div className="tradingview-widget-container">
      <div
        id={'tradingview_' + rowId + '-' + columnId}
        style={{ height: `${height}px` }}
      />
    </div>
  )
}

export default TVChart