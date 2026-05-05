<?php
/**
 * Standard-Page-Template – wird verwendet, wenn eine Page kein eigenes Template hat
 * (z.B. die Datenschutzerklaerungs-Page der Subdomain).
 * Sehr minimaler Look-and-Feel, nur lesbare Typografie.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

get_header();

if ( have_posts() ) :
    while ( have_posts() ) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 48px;">
            <header style="border-bottom: 1px solid #e0e0e0; padding-bottom: 16px; margin-bottom: 24px;">
                <h1 style="font-size: 28px; font-weight: 700; margin: 0;"><?php the_title(); ?></h1>
            </header>
            <div class="entry-content" style="font-size: 16px;">
                <?php the_content(); ?>
            </div>
        </article>
        <?php
    endwhile;
endif;

get_footer();
