<?php
class RewriteRules
{
	public static $remove_slugs_for_taxonomies = array( 'activity_type');
	public static $remove_slugs_for_post_types = array( 'activity' );
	function __construct(){
		add_filter('request', [ $this, 'request' ],10,1 );
		add_filter('term_link', [ $this, 'replace_term_links' ],10,3 );
		add_filter('post_type_link', [ $this, 'replace_post_links' ],10,3 );
	}
	public function replace_post_links($permalink, $post, $leavename ) {
		if(! in_array( $post->post_type, self::$remove_slugs_for_post_types ) ) return $permalink;
		$permalink             = str_replace( "/$post->post_type/", '/', $permalink );
		return $permalink;
	}
	public function replace_term_links($termlink, $term, $taxonomy) {
		if(! in_array( $taxonomy, self::$remove_slugs_for_taxonomies ) ) return $termlink;
		$termlink             = str_replace( "/$taxonomy/", '/', $termlink );
		return $termlink;
	}
	public function request($query) {
		$new_query = false;
		if(isset($query['name'])  && empty($query['page']) && !empty($query['name'])){
			$name = $query['name'];
			foreach (self::$remove_slugs_for_taxonomies as $taxonomy) {
				$term = get_term_by('slug', $name, $taxonomy);
				if($term && !$new_query){
					$new_query =  array($taxonomy => $name);
				}
			}
			foreach (self::$remove_slugs_for_post_types as $post_type) {
				$_post = get_page_by_path($name, OBJECT, $post_type);
				if($_post && !$new_query){
					$new_query =  array($post_type => $name);
				}
			}
		}
		return !$new_query ? $query : $new_query;
	}
}
