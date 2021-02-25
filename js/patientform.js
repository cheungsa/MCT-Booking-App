<script type="text/javascript">

function parentChildCheck() {
    if (document.getElementById('parentRadio').checked) {
        // show parent form
        document.getElementById('parent-container').style.display = 'block';
        document.getElementById('child-container').style.display = 'none';
    } else if {
        // show child form
        document.getElementById('child-container').style.display = 'block';
        document.getElementById('parent-container').style.display = 'none';
    } else {
        // hide parent and child forms
        document.getElementById('parent-container').style.display = 'none';
        document.getElementById('child-container').style.display = 'none';
    }
}

</script>
