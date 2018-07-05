<?php
$q = $_GET['q'];
$type = $_GET['e'];
//echo "<b>PRINTING THE INPUT VALUE:<br></b>" . $q . "<br><br>";
$con = mysqli_connect('localhost','root','','world');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"world");
if ($type == "list"){

    $sql="SELECT * FROM `country` WHERE Name LIKE  '$q%' OR LocalName LIKE '$q%'";

}
else if ($type == "info") {

    $sql="SELECT * FROM `country` WHERE Name = '$q'";

}
//echo "<b>SQL ERROR TEST <br></b>" .$sql . "<br><br>";
$result = mysqli_query($con,$sql);

//echo "<b>VAR DUMP RESULT:<br></b>";
//var_dump($result);
//echo "<br><br>";
$resultArray = array();
//var_dump($sql);
//$resultArray[]=$sql;
if ($type == "list"){

    while($row = mysqli_fetch_array($result)) {
        $resultArray[]=$row['Name'];

//    var_dump($row['Name']);
    }

}
else if ($type == "info") {

    while($row = mysqli_fetch_array($result,1)) {
        $resultArray[]=$row;

//    var_dump($row['Name']);
    }

}


mysqli_close($con);

if (empty($resultArray)) {
    $resultArray[]="EMPTY";
}
    echo json_encode($resultArray);
//var_dump($resultArray);
?>
