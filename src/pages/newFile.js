/* __placeholder__ */
// import Panzoom from '@panzoom/panzoom'
export default (await import('vue')).defineComponent({
mounted() {
},
methods: {
zoom() {
console.log("ok");
const panzoom: Panzoom; (this.elem);
panzoom.zoomIn;
}
},
data() {
return {
tex: document.getElementById("test"),
elem: document.getElementById('image_outer'),
// button : document.getElementById('zoom') ,
// panzoom : Panzoom(this.elem)
};
}
});
