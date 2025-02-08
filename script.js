const fields = document.querySelectorAll('input[type=text]');
const fieldsTitle = document.querySelectorAll('.section-line-title');
const fieldTags = ['crossout', 'underline', 'nothing'];

const updateTagStyle = (self) => {
    const currentTag = self.dataset['tag'];
    if (currentTag == fieldTags[0]) {
        self.style.textDecoration = "line-through";
        self.style.textDecorationThickness = "5px";
    }
    else if (currentTag == fieldTags[1]) {
        self.style.textDecoration = "underline";
        self.style.textDecorationThickness = "5px";
    }
    else if (currentTag == fieldTags[2]) {
        self.style.textDecoration = "none";
    }
}

const toggleFieldTitleTag = (self) => {
    const currentTag = self.dataset['tag'];
    if (currentTag) {
        let idx = fieldTags.indexOf(currentTag);
        idx += 1;
        if (idx > fieldTags.length - 1) {
            idx = 0;
        }
        self.dataset['tag'] = fieldTags[idx]
    } else {
        self.dataset['tag'] = fieldTags[0];
    }
    updateTagStyle(self);
}

const resetAll = () => {
    const userConfirm = confirm("Tem certeza de que deseja reiniciar o cartão? Isso apagará todos os campos.");
    if (userConfirm) {
        fields.forEach(field => field.value = '');
        fieldsTitle.forEach(title => {
            title.dataset['tag'] = fieldTags[2];
            updateTagStyle(title);
        });
        saveAllFields();
    }
}

const saveAllFields = () => {
    fields.forEach((field, idx) => localStorage.setItem(`field-${idx}`, field.value))
    fieldsTitle.forEach((title, idx) => localStorage.setItem(`title-${idx}`, title.dataset['tag'] ?? fieldTags[2]));
}

const loadAllFields = () => {
    fields.forEach((field, idx) => field.value = localStorage.getItem(`field-${idx}`))
    fieldsTitle.forEach((title, idx) => {
        title.dataset['tag'] = localStorage.getItem(`title-${idx}`) ?? fieldTags[2];
        updateTagStyle(title);
    });
}

fields.forEach(field =>
    field.addEventListener('keyup', saveAllFields)
)
fieldsTitle.forEach(title =>
    title.addEventListener('click', saveAllFields)
)

document.addEventListener('DOMContentLoaded', loadAllFields);