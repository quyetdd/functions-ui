import { eventBus } from '../client';



export const defaultErrorHander = function(jqXHR){
  var text = "Error " + jqXHR.status + '. Can not complete action';
  try {
    text = jqXHR.responseJSON.msg
  } catch (_err) {}
  eventBus.$emit('NotificationError', text);
}


// lines is array in format [{key: "", value: ""}]
// config is key-value hash
export const configToLines = function(config){
  config = config || {};
  var lines = [];
  var k;
  for (k in config) {
    lines.push({key: k, value: config[k]})
  };
  // Always show at least one empty line
  if (lines.length == 0) {
    lines.push({key: "", value: ""})
  }
  return lines;
}

export const linesToConfig = function(lines){
  var config = {};
  for (var k = 0, i = 0, len = lines.length; i < len; k = ++i) {
    var v = lines[k];
    if (v.key){
      config[v.key] = v.value;
    }
  }
  return config;
}
