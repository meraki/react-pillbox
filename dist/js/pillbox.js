var pillbox={};!function(){function e(e){e.preventDefault(),e.stopPropagation()}var t=!1;pillbox.PillBox=React.createClass({displayName:"PillBox",getDefaultProps:function(){return{pills:[],autoFocus:!0,numSuggestions:5}},getInitialState:function(){var e=this.props.pills.filter(function(e){return 1==e.selected});return{placeholderIndex:-1,draggedIndex:-1,highlightSelected:-1,highlightSuggested:0,selectedPills:e,suggestedPills:[],lookup:""}},componentDidMount:function(){document.addEventListener("click",this.handleClickOutside),this.refs.json?"[]"!=this.refs.json.getDOMNode().value&&this.triggerChange():this.state.selectedPills.length>0&&this.triggerChange()},componentWillUnmount:function(){document.removeEventListener("click",this.handleClickOutside)},componentWillUpdate:function(){this.refs.json&&this.refs.json.getDOMNode().value!=this.getJSON()&&(t=!0)},componentDidUpdate:function(){t&&(this.triggerChange(),t=!1)},getLookup:function(){return this.refs.lookup.getDOMNode().value},getAllSelectedPills:function(){return this.state.selectedPills},getAllSelectedValues:function(){return this.state.selectedPills.map(function(e){return e.value})},getAllSelectedLabels:function(){return this.state.selectedPills.map(function(e){return e.label})},getJSON:function(){return JSON.stringify(this.state.selectedPills)},addToSelected:function(e){var t=this.state.selectedPills,i=this.props.pills[e];if(i){var s=this.state.selectedPills.filter(function(e){return e.label.toLowerCase()==i.label.toLowerCase()});0==s.length&&(t.push(i),this.setState({selectedPills:t}),this.refs.json||this.triggerChange())}},addSuggestedToSelected:function(){var e=this.state.suggestedPills[this.state.highlightSuggested];if(this.clearLookup(),this.clearPrescription(),e){var t=this.state.selectedPills.filter(function(t){return t.label.toLowerCase()==e.label.toLowerCase()});if(e&&0==t.length){var i=this.state.selectedPills;i.push(e),this.setState({selectedPills:i}),this.refs.json||this.triggerChange()}}},clearSelected:function(){this.setState({selectedPills:[]}),this.refs.json||this.triggerChange()},clearLookup:function(){this.refs.lookup.getDOMNode().value="",this.setState({highlightSelected:-1,highlightSuggested:0,lookup:this.getLookup()})},clearPrescription:function(){this.setState({highlightSuggested:0,suggestedPills:[]})},removePill:function(e){this.state.selectedPills.splice(this.state.selectedPills.indexOf(e),1),this.setState({selectedPills:this.state.selectedPills}),this.refs.json||this.triggerChange()},updatePrescription:function(e){if(e.length>0){this.setState({highlightSelected:-1});var t=this.props.pills.filter(function(t){var i=this.state.selectedPills.indexOf(t)>=0;return!i&&0==t.label.toLowerCase().indexOf(e.toLowerCase())},this);this.setState({suggestedPills:t.slice(0,this.props.numSuggestions),highlightSuggested:0})}else this.clearPrescription()},indexPillWithLabel:function(e){var t=-1;return this.state.selectedPills.forEach(function(i,s){return i.label.toLowerCase()==e.toLowerCase()?void(t=s):void 0}),t},highlightSelectedPillWithLabel:function(e){this.setState({highlightSelected:this.indexPillWithLabel(e)})},highlightSelectedPillAt:function(e){this.setState({highlightSelected:e})},highlightSuggestedPillAt:function(e){var t=this.state.suggestedPills[e];t&&this.setState({highlightSuggested:e})},handleClickOutside:function(e){var t=this;e.target!=t.refs.pills.getDOMNode()&&t.clearPrescription()},handleKeyDown:function(t){if(this.setState({lookup:this.getLookup()}),8===t.which&&0==this.getLookup().length){var i=this.state.selectedPills.length-1;i==this.state.highlightSelected?this.removePill(this.state.selectedPills[i]):this.highlightSelectedPillAt(i)}13===t.which?(t.stopPropagation(),t.preventDefault(),this.addSuggestedToSelected()):27===t.which?(this.clearPrescription(),this.clearLookup()):38===t.which?e(t):40===t.which&&e(t)},handleKeyUp:function(t){this.updatePrescription(this.getLookup().trim()),38===t.which?(e(t),this.highlightSuggestedPillAt(Math.max(0,this.state.highlightSuggested-1))):40===t.which&&(e(t),this.highlightSuggestedPillAt(Math.min(this.state.suggestedPills.length-1,this.state.highlightSuggested+1)))},handleClick:function(){this.refs.lookup.getDOMNode().focus(),this.updatePrescription(this.getLookup().trim())},setPlaceholder:function(e){this.setState({draggedIndex:this.indexPillWithLabel(e)})},handleDrop:function(){var e=this.state.placeholderIndex,t=this.state.draggedIndex<e?e-1:e,i=this.state.selectedPills[this.state.draggedIndex],s=this.state.selectedPills;s.splice(this.state.draggedIndex,1),s.splice(t,0,i),this.setState({draggedIndex:-1,placeholderIndex:-1,highlightSelected:t,selectedPills:s}),this.refs.json||this.triggerChange()},handleDragOver:function(e){e.preventDefault();var t=e.target;if(t.parentNode.className.split(" ").indexOf("pill")>=0&&(t=t.parentNode),t.className.split(" ").indexOf("pill")>=0){for(var i=-1,s=-1,l=-1,a=this.refs.pills.getDOMNode().childNodes,h=this.state.placeholderIndex,n=0;n<a.length;++n){var o=a[n];if(h!=n&&++s,o.getAttribute("data-key")==t.getAttribute("data-key")){i=s,l=n;break}}h!=i&&this.setState({placeholderIndex:i})}else"prescription"==t.className&&this.setState({placeholderIndex:this.state.selectedPills.length})},triggerChange:function(){if("createEvent"in document){var e=document.createEvent("HTMLEvents");e.initEvent("change",!1,!0),this.getDOMNode().dispatchEvent(e)}else this.getDOMNode().fireEvent("onchange");this.props.onUpdate&&this.props.onUpdate(this.getAllSelectedPills())},render:function(){var e=this.state.selectedPills.map(function(e,t){return i({key:"selected-"+t,data:e,highlighted:this.state.highlightSelected==t,onRemove:this.removePill,onMouseOver:this.highlightSelectedPillWithLabel,onDragStart:this.setPlaceholder,onDragEnd:this.handleDrop})},this),t=this.state.placeholderIndex,a=this.state.draggedIndex;if(t>=0&&a>=0&&e.splice(this.state.placeholderIndex,0,s({data:this.state.selectedPills[a].label})),this.props.name)var h=this.getJSON(),n=React.DOM.input({ref:"json",type:"hidden",name:this.props.name,value:h});return React.DOM.div({className:"pillbox",onClick:this.handleClick},React.DOM.div({className:"pillbox-pills",ref:"pills",onDragOver:this.handleDragOver},e,React.DOM.span({className:"prescription"},React.DOM.input({type:"text",size:this.state.lookup.length+1,className:"prescription-lookup",ref:"lookup",autoFocus:this.props.autoFocus,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp}))),l({items:this.state.suggestedPills,highlightedIndex:this.state.highlightSuggested,onMouseOver:this.highlightSuggestedPillAt,onItemClick:this.addSuggestedToSelected}),n)}});var i=pillbox.Pill=React.createClass({displayName:"Pill",componentDidMount:function(){this.getDOMNode().addEventListener("selectstart",function(e){e.preventDefault(),e.stopPropagation();var t=e.target;t.dragDrop()})},handleRemove:function(){this.props.onRemove(this.props.data)},handleMouseOver:function(){this.props.onMouseOver(this.props.data.label)},handleMouseOut:function(){this.props.onMouseOver("")},handleDragStart:function(e){e.dataTransfer.effectAllowed="move",-1!=navigator.userAgent.indexOf("Firefox")&&e.dataTransfer.setData("text/html",this.props.data.label),this.props.onDragStart(this.props.data.label)},handleDragEnd:function(){this.props.onDragEnd()},render:function(){var e=["pill"];this.props.highlighted&&e.push("pill-highlighted");var t=e.join(" "),i=this.props.data.label,s=this.props.onRemove?React.DOM.button({tabIndex:"-1",className:"remove",onClick:this.handleRemove},React.DOM.span(null,"X")):null;return React.DOM.span({draggable:"true",className:t,"data-key":this.props.key,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut,onDragStart:this.handleDragStart,onDragEnd:this.handleDragEnd},React.DOM.span(null,i),s)}}),s=pillbox.PlaceholderPill=React.createClass({displayName:"PlaceholderPill",render:function(){return React.DOM.span({className:"pill-placeholder"})}}),l=pillbox.PrescriptionList=React.createClass({displayName:"PrescriptionList",setHighlight:function(e){var t=0;this.props.items.forEach(function(i,s){return i.label.toLowerCase()==e.toLowerCase()?void(t=s):void 0}),this.props.onMouseOver(t)},handleItemClick:function(e){this.setHighlight(e),this.props.onItemClick()},render:function(){var e=this.props.items.map(function(e,t){return a({key:"prescription-item-"+t,data:e,highlighted:this.props.highlightedIndex==t,onMouseOver:this.setHighlight,onClick:this.handleItemClick})},this),t=["prescription-list"];0==this.props.items.length&&t.push("prescription-list-empty");var i=t.join(" ");return React.DOM.div({className:i},e)}}),a=pillbox.PrescriptionItem=React.createClass({displayName:"PrescriptionItem",getInitialState:function(){return{highlighted:!1}},handleMouseOver:function(){this.props.onMouseOver(this.props.data.label)},handleClick:function(){this.props.onClick(this.props.data.label)},render:function(){var e=["prescription-item"];this.props.highlighted&&e.push("prescription-item-highlighted");var t=e.join(" ");return React.DOM.div({className:t,onMouseOver:this.handleMouseOver,onClick:this.handleClick},this.props.data.label)}})}();var PillBox=pillbox.PillBox;