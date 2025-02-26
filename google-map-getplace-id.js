const GOOGLEMAPAPIKEY = "";
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: GOOGLEMAPAPIKEY,v: "weekly"});
const get_place_id = async function (LAT,LNG){
	const {Place,SearchNearbyRankPreference} = await google.maps.importLibrary("places");
  let place_id = 0;
	let center = new google.maps.LatLng(LAT, LNG);
	const request = {
		// required parameters
		fields: ["displayName", "location"],
		locationRestriction: {
			center: center,
			radius: 100,
		},
		maxResultCount: 1,
		rankPreference: SearchNearbyRankPreference.POPULARITY,
		language: "en-US",
		region: "us",
	};
	const { places } = await Place.searchNearby(request);
	if(places.length){
		place_id = places[0].id;
	}
	return place_id;
}
place_id = get_place_id(51.52781,-0.2698899999999999);
if(place_id){
  // Do something
}
