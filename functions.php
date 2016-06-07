<?php
/**
 * Work functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Work
 */
define ( 'THEME_NAME', 'work' );
define ( 'THEME_VERSION', 1.0 );

$settings = array(
    'content_width' => 650,
    'images' => array(
        'icon' => array(
            'width' => 32,
            'height' => 32,
            'crop' => 1
        ),
        'tiny' => array(
            'width' => 150,
            'height' => 85,
            'crop' => 1
        ),
        'thumbnail' => array(
            'width' => 400,
            'height' => 225,
            'crop' => 1
        ),
        'medium' => array(
            'width' => 900,
            'height' => 505,
            'crop' => 1
        ),
        'large' => array(
            'width' => 1200,
            'height' => 675,
            'crop' => 0
        )
    )
);

add_action( 'wp_enqueue_scripts', 'salient_child_enqueue_styles');
function salient_child_enqueue_styles() {

    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', array('skin-ascend','font-awesome'));

    if ( is_rtl() )
   		wp_enqueue_style(  'salient-rtl',  get_template_directory_uri(). '/rtl.css', array(), '1', 'screen' );
}

/** Enqueue custom javascript files **/
function custom_work_js() {
    wp_register_script('main_work', '/wp-content/themes/work/js/main_work.js', array('jquery'), NULL, false);
    wp_enqueue_script( 'main_work' );
}
add_action('wp_enqueue_scripts', 'custom_work_js');

/** Vendor styles and javascript - Odometer - dynamic counter **/
function vendor_files() {
    wp_enqueue_style( 'flipclock-style', '/wp-content/themes/work/css/vendor/flipclock.css', array());
    wp_register_script('flipclock-script', '/wp-content/themes/work/js/vendor/flipclock.min.js', array('jquery'), NULL, false);
    wp_register_script('flipclock-counter', '/wp-content/themes/work/js/vendor/counter.js', array('jquery'), NULL, false);
    wp_enqueue_script( 'flipclock-script');
    wp_enqueue_script( 'flipclock-counter');
}
add_action('wp_enqueue_scripts', 'vendor_files');

/** Set image sizes **/
function work_images_init() {
    global $settings;

    add_theme_support( 'post-thumbnails' );

    set_post_thumbnail_size( $settings['images']['thumbnail']['width'], $settings['images']['thumbnail']['height'], $settings['images']['thumbnail']['crop'] );
    add_image_size( 'icon', $settings['images']['icon']['width'], $settings['images']['icon']['height'], $settings['images']['icon']['crop'] );
    add_image_size( 'tiny', $settings['images']['tiny']['width'], $settings['images']['tiny']['height'], $settings['images']['tiny']['crop'] );
    update_option( 'medium_size_w', $settings['images']['medium']['width'] );
    update_option( 'medium_size_h', $settings['images']['medium']['height'] );
    update_option( 'medium_crop', $settings['images']['medium']['crop'] );
    update_option( 'large_size_w', $settings['images']['large']['width'] );
    update_option( 'large_size_h', $settings['images']['large']['height'] );
    update_option( 'large_crop', $settings['images']['large']['crop'] );
    add_filter('widget_text', 'do_shortcode');
}

/** Prevent image sizes being modified by Admins **/
add_filter( 'pre_update_option_thumbnail_size_w', 'work_filter_thumbnail_size_w' );
function work_filter_thumbnail_size_w( $newvalue ) {
    global $settings;
	return $settings['images']['thumbnail']['width'];
}

add_filter( 'pre_update_option_thumbnail_size_h', 'work_filter_thumbnail_size_h' );
function work_filter_thumbnail_size_h( $newvalue ) {
    global $settings;
	return $settings['images']['thumbnail']['height'];
}

add_filter( 'pre_update_option_thumbnail_crop', 'work_filter_thumbnail_crop' );
function work_filter_thumbnail_crop( $newvalue ) {
    global $settings;
	return $settings['images']['thumbnail']['crop'];
}

add_filter( 'pre_update_option_medium_size_w', 'work_filter_medium_size_w' );
function work_filter_medium_size_w( $newvalue ) {
    global $settings;
	return $settings['images']['medium']['width'];
}

add_filter( 'pre_update_option_medium_size_h', 'work_filter_medium_size_h' );
function work_filter_medium_size_h( $newvalue ) {
    global $settings;
	return $settings['images']['medium']['height'];
}

add_filter( 'pre_update_option_large_size_w', 'work_filter_large_size_w' );
function work_filter_large_size_w( $newvalue ) {
    global $settings;
	return $settings['images']['large']['width'];
}

add_filter( 'pre_update_option_large_size_h', 'work_filter_large_size_h' );
function work_filter_large_size_h( $newvalue ) {
    global $settings;
	return $settings['images']['large']['height'];
}

function work_content_width() {
	// $GLOBALS['content_width'] = apply_filters( 'work_content_width', $settings['content_width'] );
}
add_action( 'after_setup_theme', 'work_content_width', 0 );

/* Remove PORFOLIO post type created by parent theme */
add_action( 'after_setup_theme','remove_custom_post_types', 100 );
function remove_custom_post_types() {
	remove_action( 'init', 'portfolio');
	remove_action( 'init', 'home_slider');
}

//Shortcode Processing
if (!function_exists('nectar_shortcode_processing')) {
	function nectar_shortcode_processing(){
		require_once ( 'nectar/tinymce/shortcode-processing.php' );
	}
}


add_action('init', 'nectar_shortcode_processing');

function work_related_posts( $post_id = null ) {
    global $settings;

    if( !$settings['show_related_posts']['active'] )
        return false;

    global $post;
    $html = null;

    if( $settings['show_related_posts']['limit'] == 1 )
        $layout_class = "whole";
    elseif( $settings['show_related_posts']['limit'] == 2 )
        $layout_class = "halves";
    elseif( $settings['show_related_posts']['limit'] == 3 )
        $layout_class = "thirds";
    elseif( $settings['show_related_posts']['limit'] == 4 )
        $layout_class = "quarters";
    elseif( $settings['show_related_posts']['limit'] == 5 )
        $layout_class = "fifths";
    else
        $layout_class = "thirds";

    if( !$post_id )
        $post_id = $post->ID;

    $original_post = $post;
    $tags = wp_get_post_tags($post->ID);
    $cats = wp_get_post_categories($post->ID);

    $tag_ids = array();
    $cat_ids = array();

    if($tags) {
        foreach($tags as $tag)
            $tag_ids[] = $tag->term_id;
    } elseif ($cats) {
        foreach($cats as $cat)
            $cat_ids[] = $cat;
    } else {
        return false;
    }

    $post = $original_post;
    wp_reset_query();

    $args = array(
        'tag__in' => $tag_ids,
        'category__in' => $cat_ids,
        'post__not_in' => array($post->ID),
        'posts_per_page' => $settings['show_related_posts']['limit'],
        'caller_get_posts' => 1
    );

    $get_related = new wp_query( $args );

    if( $get_related->have_posts() ) {
        ?>
        <div class="widget related-posts layout-<?php echo $layout_class; ?>" role="complementary">
            <h5 class="widget-title"><?php echo __( 'Related Articles', THEME_NAME ); ?></h5>
            <ul>
            <?php
            while ($get_related->have_posts()) {
                $get_related->the_post();

                $category_classes = ' ';

                if(get_the_category()) {
                    foreach((get_the_category()) as $category) {
                        $category_classes .= 'category-' . $category->slug;
                    }
                }

                if($category_classes == ' ')
                    $category_classes = null;
                ?>
                <li class="<?php echo get_post_type(); ?> type-<?php echo get_post_type(); ?> status-<?php echo get_post_status(); ?> post-<?php the_ID(); ?><?php echo $category_classes; ?><?php if(has_post_thumbnail()) echo ' has-post-thumbnail'; ?>">
                    <?php if(has_post_thumbnail()) : ?>
                    <div class="thumbnail"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title; ?>"><?php the_post_thumbnail(); ?></a></div>
                    <?php endif; ?>
                    <h4 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title; ?>"><?php the_title(); ?></a></h4>
                    <p class="byline"><?php echo __('By', THEME_NAME); ?> <span class="author vcard"><?php the_author(); ?></span></p>
                </li>
                <?php
            }
            ?>
            </ul>
        </div>
        <?php
    } else {
        return false;
    }

}


?>
