export default class UsosUserResponse{
    constructor(user, userDetails) {
        this.about = true;
        this.name = user.name;
        this.id = user.id;
        this.rule = this.setRule(userDetails.student_status, userDetails.staff_status);
        this.image = userDetails.photo_urls["50x50"];
        this.email = userDetails.email === null ? "brak" : userDetails.email;
        this.position = userDetails.employment_positions.length === 0 ? "brak" : userDetails.employment_positions[0].position.name.pl;//pozycja zatrudnienia
        this.faculty = userDetails.employment_positions.length === 0 ? "brak" : userDetails.employment_positions[0].faculty.name.pl;//wydział
        this.homepage = userDetails.homepage_url === "" ? "brak" : userDetails.homepage_url;
        this.title = userDetails.titles.before === null ? "" : userDetails.titles.before;
    }

    setRule(student_status, staff_status){
        const student = this.getStudentStatusName(student_status);
        const staff = this.getStaffStatusName(staff_status);
        if (student !== '' && staff !== '')
            return student + " | " + staff;
        if(student !== '')
            return student;
        return staff;
    }

    getStudentStatusName(student_status_id){
        switch (student_status_id) {
            case null: {
                return "";
            }
            case 0:{
                return ""
            }
            case 1:{
                return "Nieaktywny student"
            }
            case 2:{
                return "Aktywny student"
            }
        }
    }

    getStaffStatusName(staff_status_id){
        switch (staff_status_id) {
            case undefined:
                return "";
            case null:
                return ""
            case 0:{
                return ""
            }
            case 1:{
                return "Pracownik UMK"
            }
            case 2:{
                return "Wykładowca UMK"
            }
        }
    }
}
