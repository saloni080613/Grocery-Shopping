package Model;



    public class Admins {

        private int adminId;
        private String name;
        private long phone;
        private String email;

        // Constructors
        public Admins() {}

        public Admins(int adminId, String name, long phone, String email) {
            this.adminId = adminId;
            this.name = name;
            this.phone = phone;
            this.email = email;
        }

        // Getters and Setters
        public int getAdminId() {
            return adminId;
        }

        public void setAdminId(int adminId) {
            this.adminId = adminId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public long getPhone() {
            return phone;
        }

        public void setPhone(long phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        // Optional: toString method
        @Override
        public String toString() {
            return "Admins{" +
                    "adminId=" + adminId +
                    ", name='" + name + '\'' +
                    ", phone=" + phone +
                    ", email='" + email + '\'' +
                    '}';
        }
    }

