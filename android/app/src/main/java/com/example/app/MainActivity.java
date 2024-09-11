package com.example.app;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    final WebView webView = findViewById(com.getcapacitor.android.R.id.webview);
    final WebSettings webViewSettings = webView.getSettings();
    webView.setWebChromeClient(new WebChromeClient());
    webViewSettings.setAllowFileAccess(true);
    webViewSettings.setPluginState(WebSettings.PluginState.ON);
    webViewSettings.setPluginState(WebSettings.PluginState.ON_DEMAND);
    webViewSettings.setJavaScriptEnabled(true);
  }
}
