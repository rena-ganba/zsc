
<?php 
/*
Copyright (c) 2018 ZSC Dev Team
*/
?>

<html>
<head>
<?php 
include("adm_header.php");

    $htmlObjects = new ZSCHtmlObjects();
    echo $htmlObjects->loadScriptFiles();
?>
<script type="text/javascript">
    var web3;
    if (doesLocalWeb3js()) {
        web3 = setupWeb3js();
    } else {
        //Metamask
        web3 = new Web3(web3.currentProvider);
    }
    
    function gotoConfigureLogRecorder() {
        var href = "adm_configure_logrecorder.php" + cC_getUrlSuffixForControlPage();
        window.location.href = href;
    }

</script>
</head>
<body>

<?php 
    echo $htmlObjects->loadHeader();

    echo '<div class="page-header"> <font size="5" color="blue" >Setup ZSC system in the testing envrioment</font></div>';
    echo $htmlObjects->loadAllAdrs();

    echo $htmlObjects->loadCreateContract('cC_setupContract');
?>
    <div class="well">
        <button type="button" onClick="gotoConfigureLogRecorder()">Next: configure log recorder</button>
    </div>

<?php echo $htmlObjects->loadEthereumEnable(); ?>

</body>
</html>



