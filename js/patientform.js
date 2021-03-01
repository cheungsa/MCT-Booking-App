<script type="text/javascript">

var clientAllergyCount = 1;
var childCount = 0;
var childrenAllergyAccount = [0];

function parentChildCheck() {
  if (document.getElementById('parentRadio').checked) {
      document.getElementById('patient-form-divider').style.display = 'block';
      // show parent form
      document.getElementById('parent-container').style.display = 'block';
      document.getElementById('client-container').style.display = 'none';
  } else if (document.getElementById('childRadio').checked) {
      // show child form
      document.getElementById('patient-form-divider').style.display = 'block';
      document.getElementById('client-container').style.display = 'block';
      document.getElementById('parent-container').style.display = 'none';
  } else {
      // hide parent and child forms
      document.getElementById('parent-container').style.display = 'none';
      document.getElementById('client-container').style.display = 'none';
  }
}

function addClientAllergy() {
  var allergyForm = document.getElementById('client-allergy-container1');
  var parent = document.getElementById('client-allergy-container' + clientAllergyCount);
  var clone = parent.cloneNode(true);
  clientAllergyCount++;
  clone.setAttribute('id', 'client-allergy-container' + clientAllergyCount);
  clone.getElementsByClassName('h5')[0].innerHTML = "Allergy " + clientAllergyCount;
  parent.appendChild(clone);
}

function addChild() {
  var childForm = document.getElementById('child-container1');
  var clone = childForm.cloneNode(true);
  var divider = document.getElementById('patient-form-divider');
  var dividerClone = divider.cloneNode(true);
  var parent = document.getElementById('parent-form-row');

  if (childCount > 0) {
    parent = document.getElementById('child-container' + childCount);
  }

  childCount++;
  clone.setAttribute('id', 'child-container' + childCount);
  clone.getElementsByClassName('h3')[0].innerHTML = "Child " + childCount;
  parent.appendChild(clone);
}

function addChildAllergy() {
  var allergyForm = document.getElementById('child-allergy-container1');
  var parent = document.getElementById('child-allergy-container' + childrenAllergyCount);
  var clone = parent.cloneNode(true);
  allergyCount++;
  clone.setAttribute('id', 'child-allergy-container' + childrenAllergyCount);
  clone.getElementsByClassName('h5')[0].innerHTML = "Allergy " + childrenAllergyCount;
  parent.appendChild(clone);
}

</script>
