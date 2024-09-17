document.addEventListener('DOMContentLoaded', () =>{

	const formBtn = document.querySelector('.form__btn');
	let students = JSON.parse(localStorage.getItem('students')) || [];
	const table = document.querySelector('.table');
	const rows = table.getElementsByTagName('tr');
	const fullNameHeader = document.getElementById('fullName');
	const fac = document.getElementById('faculty');
	const birthday = document.getElementById('birthday');
	const study = document.getElementById('study');
	const filterName = document.getElementById('filterName');
	const filterFaculty = document.getElementById('filterFaculty');
	const filterStart = document.getElementById('filterStart');
	const filterEnd = document.getElementById('filterEnd');
	let filteredStudents = [];

	students = students.map(student => ({
		...student,
		dateOfBirth: new Date(student.dateOfBirth)
	}));

	if(students.length > 0){
		students.forEach(student => addToTable(student));
	}

	formBtn.addEventListener('click', (e) =>{
		e.preventDefault();
		let errors = [];

		const formFields = {
			firstName: { value: document.querySelector('.firstName').value.trim(), label: 'Fisrt Name' },
			lastName: { value: document.querySelector('.lastName').value.trim(), label: 'Last Name' },
			fatherName: { value: document.querySelector('.fatherName').value.trim(), label: 'Middle Name' },
			dateOfBirth: { value: document.querySelector('.dateOfBirth').value, label: 'Date of birth' },
			yearOfStudy: { value: document.querySelector('.yearOfStudy').value.trim(), label: 'Year of starting the university' },
			faculty: { value: document.querySelector('.faculty').value.trim(), label: 'Faculty' }
		};

		
		for (const key in formFields) {
			if (formFields[key].value === '') {
				errors.push(formFields[key].label);
			}
		}

		
		if (new Date(formFields.dateOfBirth.value).getFullYear() < 1900) {
			errors.push('The year of birth cannot be older than 1900th');
		}

		if (parseInt(formFields.yearOfStudy.value, 10) < 2000) {
			errors.push('The year of starting the university cannot be older than 2000th');
		}

		
		if (errors.length > 0) {
			alert(`Fill the fields: ${errors.join(', ')}`);
		} else {
			const student = {
				firstName: formFields.firstName.value,
				lastName: formFields.lastName.value,
				fatherName: formFields.fatherName.value,
				dateOfBirth: new Date(formFields.dateOfBirth.value),
				yearOfStudy: parseInt(formFields.yearOfStudy.value, 10),
				faculty: formFields.faculty.value,
				fullName: `${formFields.lastName.value} ${formFields.firstName.value} ${formFields.fatherName.value}`,
			};
	
			students.push(student);
			localStorage.setItem('students', JSON.stringify(students));
			addToTable(student);
			clearForm();
			str = '';
		}
		


	});

	function addToTable(student){
		let age;
		let statusOfStudy;
		let isEmpty;
		let rowToFill = null;

				for (let i = 1; i < rows.length; i++) {
					const cells = rows[i].getElementsByTagName('td');
					isEmpty = true;
			
					for (let j = 0; j < cells.length; j++) {
					if (cells[j].textContent.trim() !== "") {
						isEmpty = false;
						break;
					}
					}

					if(isEmpty){

						rowToFill = cells;
						break;
					}
				}

					if(!rowToFill){
						const newRow = table.insertRow();
						rowToFill = [newRow.insertCell(), newRow.insertCell(), newRow.insertCell(), newRow.insertCell()];
					}

					rowToFill[0].textContent = student.fullName;
					rowToFill[1].textContent = student.faculty;
		
						const today = new Date();
						if(today.getMonth() - student.dateOfBirth.getMonth() > 0){
							age = today.getFullYear() - student.dateOfBirth.getFullYear();
						} else {
							age = today.getFullYear() - student.dateOfBirth.getFullYear() -1;
						};
		
						rowToFill[2].textContent = `${student.dateOfBirth.getDate().toString().padStart(2, '0')}.${(student.dateOfBirth.getMonth() + 1).toString().padStart(2, '0')}.${student.dateOfBirth.getFullYear()} (${age} years)`;
		
						if(today.getFullYear() > student.yearOfStudy + 4 ||(today.getFullYear() === student.yearOfStudy + 4  && today.getMonth() >= 8)){
							statusOfStudy = '(graduated)';
						} else {
							statusOfStudy = `(${today.getFullYear() - student.yearOfStudy} year)`;
						};
		
						rowToFill[3].textContent = `${student.yearOfStudy} - ${student.yearOfStudy + 4} ${statusOfStudy}`;
					
	};

	function clearForm(){
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => input.value = '');
	};

	fullNameHeader.addEventListener('click', () => {

		students.sort((a,b) => {
			if (a.fullName > b.fullName){
				return 1;
			}
			if (a.fullName < b.fullName){
				return -1;
			}

			return 0;
		});

		clearTable();

		students.forEach((student) => addToTable(student));
	});

	function clearTable(){

		for (let i = 1; i < rows.length; i++){

			const cells = rows[i].getElementsByTagName('td');

			for (let j = 0; j < cells.length; j++) {
				cells[j].textContent= "";
			};
		};
	};

	fac.addEventListener('click', () =>{

		students.sort((a,b) =>{

			if (a.faculty > b.faculty){
				return 1;
			}
			if (a.faculty < b.faculty){
				return -1;
			}

			return 0;
		});

		clearTable();

		students.forEach((student) => addToTable(student));
	});

	study.addEventListener('click', () =>{

		students.sort((a,b) =>{
			return a.yearOfStudy - b.yearOfStudy;
		});

		clearTable();

		students.forEach((student) => addToTable(student));
	});

	birthday.addEventListener('click', () =>{

		students.sort((a,b) =>{
			if (a.dateOfBirth.getFullYear() < b.dateOfBirth.getFullYear()){
				return 1;
			}
			if (a.dateOfBirth.getFullYear() > b.dateOfBirth.getFullYear()){
				return -1;
			}
			if (a.dateOfBirth.getFullYear() === b.dateOfBirth.getFullYear()){
				if (a.dateOfBirth.getMonth() < b.dateOfBirth.getMonth()){
					return 1;
				}
				if (a.dateOfBirth.getMonth() > b.dateOfBirth.getMonth()){
					return -1;
				}
				if (a.dateOfBirth.getMonth() === b.dateOfBirth.getMonth()){
					if (a.dateOfBirth.getDate() < b.dateOfBirth.getDate()){
						return 1;
					}
					if (a.dateOfBirth.getDate() > b.dateOfBirth.getDate()){
						return -1;
					}
				}
			}

			return 0;
		});

		clearTable();

		students.forEach((student) => addToTable(student));
	});

	function filterStudents() {
		const nameStr = filterName.value.toLowerCase().trim();
		const facultyStr = filterFaculty.value.toLowerCase().trim();
		const startYear = filterStart.value.trim();
		const endYear = filterEnd.value.trim();
  
		filteredStudents = students.filter(student => {
		  const matchName = `${student.firstName} ${student.lastName} ${student.fatherName}`.toLowerCase().includes(nameStr);
		  const matchFaculty = student.faculty.toLowerCase().includes(facultyStr);
		  const matchStartYear = startYear ? student.yearOfStudy.toString() === startYear : true;
		  const matchEndYear = endYear ? (student.yearOfStudy + 4).toString() === endYear : true;
  
		  return matchName && matchFaculty && matchStartYear && matchEndYear;
		});

		clearTable();
		filteredStudents.forEach(student => addToTable(student));
		
	};

	filterName.addEventListener('input', filterStudents);
	filterFaculty.addEventListener('input', filterStudents);
	filterStart.addEventListener('input', filterStudents);
	filterEnd.addEventListener('input', filterStudents);
					
			

			
	
			
			

	
})