-- Drop old enums if they exist from previous scaffolding
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS people_category CASCADE;
DROP TYPE IF EXISTS tenure_status CASCADE;
DROP TYPE IF EXISTS document_category CASCADE;
DROP TYPE IF EXISTS admin_role_type CASCADE;

-- Create Enums
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
CREATE TYPE official_hierarchy AS ENUM (
  'university_principal_officer', 
  'dean_student_affairs', 
  'faculty_dean', 
  'department_hod', 
  'staff_advisor_faculty', 
  'staff_advisor_dept', 
  'lecturer', 
  'student_leader_nans', 
  'student_leader_faculty', 
  'student_leader_dept'
);
CREATE TYPE tenure_status AS ENUM ('current', 'past');
CREATE TYPE doc_category AS ENUM ('academic_calendar', 'lecture_timetable', 'exams_timetable', 'memo');
CREATE TYPE admin_role_type AS ENUM ('technical_director', 'pro');

-- 1. admin_roles
CREATE TABLE admin_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role admin_role_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. students
CREATE TABLE students (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    mat_no TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    department TEXT NOT NULL,
    level TEXT NOT NULL,
    phone TEXT UNIQUE,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    session TEXT NOT NULL,
    semester TEXT NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    paystack_reference TEXT UNIQUE NOT NULL,
    receipt_number TEXT UNIQUE,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. people
CREATE TABLE people (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    hierarchy official_hierarchy NOT NULL,
    department TEXT,
    sub_association TEXT,
    rank_or_position TEXT NOT NULL,
    photo_url TEXT,
    tenure_status tenure_status NOT NULL DEFAULT 'current',
    start_year INTEGER,
    end_year INTEGER,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category doc_category NOT NULL,
    session TEXT,
    file_url TEXT NOT NULL,
    version_label TEXT,
    revision_no INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. activities
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMPTZ,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. org_info
CREATE TABLE org_info (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    motto TEXT,
    logo_url TEXT,
    history TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_info ENABLE ROW LEVEL SECURITY;

-- ADMIN CHECK FUNCTION (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles WHERE admin_roles.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- POLICIES

-- 1. admin_roles
CREATE POLICY "Users can view their own admin role"
    ON admin_roles FOR SELECT
    USING (auth.uid() = user_id);

-- 2. students
CREATE POLICY "Students can view their own record"
    ON students FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all students"
    ON students FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Students can update their own record"
    ON students FOR UPDATE
    USING (auth.uid() = id);

-- 3. payments
CREATE POLICY "Students can view their own payments"
    ON payments FOR SELECT
    USING (student_id = auth.uid());

CREATE POLICY "Admins can view all payments"
    ON payments FOR SELECT
    USING (public.is_admin());

-- 4. people
CREATE POLICY "People are viewable by everyone"
    ON people FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert people"
    ON people FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update people"
    ON people FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can delete people"
    ON people FOR DELETE
    USING (public.is_admin());

-- 5. documents
CREATE POLICY "Documents are viewable by everyone"
    ON documents FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert documents"
    ON documents FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update documents"
    ON documents FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can delete documents"
    ON documents FOR DELETE
    USING (public.is_admin());

-- 6. activities
CREATE POLICY "Activities are viewable by everyone"
    ON activities FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert activities"
    ON activities FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update activities"
    ON activities FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can delete activities"
    ON activities FOR DELETE
    USING (public.is_admin());

-- 7. org_info
CREATE POLICY "Org info is viewable by everyone"
    ON org_info FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert org info"
    ON org_info FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update org info"
    ON org_info FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can delete org info"
    ON org_info FOR DELETE
    USING (public.is_admin());
