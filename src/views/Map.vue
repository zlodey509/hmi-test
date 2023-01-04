<template>
  <div style="height:600px; width:800px; margin-inline: auto;">
    <l-map @click="openCreateMarkModal" :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom" :minZoom="3" :maxZoom="18" :center="[48.382778, 31.182233]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker v-for="marker in markers" :lat-lng="[marker?.latlng?.lat, marker?.latlng?.lng]">
        <l-tooltip>
          {{marker.name}}
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>

  <GDialog v-model="modal_show">
  	<div class="modal_wrapper">
  		<div class="modal_form">
  			<div class="modal_form__item">
  				<label for="">Latitude:</label>
  				<input type="text" v-model="new_mark.lat" disabled>
  			</div>
  			<div class="modal_form__item">
  				<label for="">Longitude:</label>
  				<input type="text" v-model="new_mark.lng" disabled>
  			</div>
  			<div class="modal_form__item">
  				<label for="">Title:</label>
  				<input type="text" v-model="new_mark.title">
  			</div>
  			<button style="padding: 5px; font-size: 20px; margin-top: 20px;" @click="createNewMark">Save</button>
  		</div>
  	</div>
  </GDialog>
</template>

<script>
	import "leaflet/dist/leaflet.css";
	import 'leaflet'
	import { LMap, LTileLayer, LMarker, LTooltip, } from "@vue-leaflet/vue-leaflet";

	import { GDialog } from 'gitart-vue-dialog'
	import "gitart-vue-dialog/dist/style.css";

	export default {
	  components: {
	    LMap,
	    LTileLayer,
	    LMarker,
	    LTooltip,
	    GDialog
	  },
	  data() {
	    return {
	      zoom: 6,
	      modal_show: false,
	      markers: [
	      	{
	      		name: 'Center of Ukraine',
	      		latlng: {
	      			lat: 48.382778,
	      			lng: 31.182233
	      		},
	      	},
	      ],
	      new_mark: {
	      	lat: '',
	      	lng: '',
	      	title: ''
	      },
	    };
	  },
	  watch:{
	  	markers:{
	  	  handler(){
	  	    window.localStorage.setItem('markers', JSON.stringify(this.markers))
	  	  },
	  	  deep: true
	  	},
	  },
	  mounted(){
	  	if(window.localStorage.getItem('markers') != 'null'){
	  		this.markers = JSON.parse(window.localStorage.getItem('markers'))
	  	}
	  },
	  methods:{
	  	openCreateMarkModal(e){
	  		if(e.latlng){
	  			this.new_mark.lat = e.latlng.lat
	  			this.new_mark.lng = e.latlng.lng
	  			this.modal_show = true
	  		}
	  	},
	  	createNewMark(){
	  		let new_marker = {
	  			name: this.new_mark.title,
	      		latlng: {
	      			lat: this.new_mark.lat,
	      			lng: this.new_mark.lng
	      		},
	  		}
	  		this.markers.push(new_marker)
	  		this.new_mark = {
		      	lat: '',
		      	lng: '',
		      	title: ''
		      }
	  		this.modal_show = false
	  	}
	  },
	};
</script>

<style></style>