#!/usr/bin/php -q
<?php
$xml_feed_url = 'www.politika.rs/rss';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $xml_feed_url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$xml = curl_exec($ch);
curl_close($ch);
file_put_contents ('../xml_test', $xml );
?>
