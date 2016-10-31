<?php
if ( isset( $_GET["email"] ) ) {
	$fh = fopen("emails.txt", "a+");
	fwrite( $fh, $_GET["email"]."\n" );
	fclose( $fh );
}

echo "done";
?>