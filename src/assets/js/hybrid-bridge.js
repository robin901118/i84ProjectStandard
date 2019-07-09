/**
 * 初始化hybridAPP
 * 初始化以后可以调用原生APP方法（需要原生开发工程师配合）
 * 这边是做一个初始化动作
 * 调用方式：BRIDGE.callHandler('actionFromJs', {}, function (responseData) {});
 * 安卓和IOS调用方式一致，
 * actionFromJs是方法名，需要和原生工程师一起约定，
 * 中间是参数对象，如：{uname:XXX,age:18}
 * 后面的的function是回调,携带原生之间的通讯参数
 * **/

const initHybridBridge = {
  init:function(deviceType){
    if(!deviceType) return;
    (function () {
      if (window.WebViewJavascriptBridge || deviceType === "ios") {
        return false;
      }
      var messagingIframe;
      var sendMessageQueue = [];
      var receiveMessageQueue = [];
      var messageHandlers = {};
      var CUSTOM_PROTOCOL_SCHEME = 'yy';
      var QUEUE_HAS_MESSAGE = '__QUEUE_MESSAGE__/';
      var responseCallbacks = {};
      var uniqueId = 1;

      function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
      }

      /*set default messageHandler*/
      function init(messageHandler) {
        if (WebViewJavascriptBridge._messageHandler) {
          throw new Error('WebViewJavascriptBridge.init called twice');
        }
        WebViewJavascriptBridge._messageHandler = messageHandler;
        var receivedMessages = receiveMessageQueue;
        receiveMessageQueue = null;
        for (var i = 0; i < receivedMessages.length; i++) {
          _dispatchMessageFromNative(receivedMessages[i]);
        }
      }

      function send(data, responseCallback) {
        _doSend({data: data}, responseCallback);
      }

      function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
      }

      function callHandler(handlerName, data, responseCallback) {
        _doSend({handlerName: handlerName, data: data}, responseCallback);
      }

      /*sendMessage add message, 触发native处理 sendMessage*/
      function _doSend(message, responseCallback) {
        if (responseCallback) {
          var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
          responseCallbacks[callbackId] = responseCallback;
          message.callbackId = callbackId;
        }
        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
      }

      /* 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url shouldOverrideUrlLoading 的方式返回内容*/
      function _fetchQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        /*android can't read directly the return data, so we can reload iframe src to communicate with java*/
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + encodeURIComponent(messageQueueString);
      }

      /*提供给native使用,*/
      function _dispatchMessageFromNative(messageJSON) {
        setTimeout(function () {
          var message = JSON.parse(messageJSON);
          var responseCallback;
          /*java call finished, now need to call js callback function*/
          if (message.responseId) {
            responseCallback = responseCallbacks[message.responseId];
            if (!responseCallback) {
              return;
            }
            responseCallback(message.responseData);
            delete responseCallbacks[message.responseId];
          } else {/*直接发送*/
            if (message.callbackId) {
              var callbackResponseId = message.callbackId;
              responseCallback = function (responseData) {
                _doSend({responseId: callbackResponseId, responseData: responseData});
              };
            }
            var handler = WebViewJavascriptBridge._messageHandler;
            if (message.handlerName) {
              handler = messageHandlers[message.handlerName];
            }
            /*查找指定handler*/
            try {
              handler(message.data, responseCallback);
            } catch (exception) {
              if (typeof console != 'undefined') {
                console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception);
              }
            }
          }
        });
      }

      /*提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以*/
      function _handleMessageFromNative(messageJSON) {
        if (receiveMessageQueue && receiveMessageQueue.length > 0) {
          receiveMessageQueue.push(messageJSON);
        } else {
          _dispatchMessageFromNative(messageJSON);
        }
      }

      var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
        init: init,
        send: send,
        registerHandler: registerHandler,
        callHandler: callHandler,
        _fetchQueue: _fetchQueue,
        _handleMessageFromNative: _handleMessageFromNative
      };
      var doc = document;
      _createQueueReadyIframe(doc);
      var readyEvent = doc.createEvent('Events');
      readyEvent.initEvent('WebViewJavascriptBridgeReady');
      readyEvent.bridge = WebViewJavascriptBridge;
      doc.dispatchEvent(readyEvent);
    })();

    /** Android端初始化 **/
    function connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
          callback(WebViewJavascriptBridge)
        }, false);
      }
    }

    /** IOS端初始化 **/
    function setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      } else {
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }

    if (deviceType === 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        /*挂载上全局对象*/
        window.BRIDGE = bridge;
      })
    }
    if (deviceType === 'android') {
      connectWebViewJavascriptBridge(function (bridge) {
        /*挂载上全局对象*/
        window.BRIDGE = bridge;
      })
    }
  }
};
export default initHybridBridge;

