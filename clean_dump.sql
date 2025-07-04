--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    form_id integer,
    question_id integer,
    response text,
    remark text,
    score integer,
    question_text text,
    answer text,
    question_number integer,
    CONSTRAINT answers_remark_check CHECK ((remark = ANY (ARRAY['Poor'::text, 'Credit'::text, 'Good'::text, 'Better'::text, 'Excellent'::text]))),
    CONSTRAINT answers_response_check CHECK ((response = ANY (ARRAY['Yes'::text, 'No'::text, 'NA'::text]))),
    CONSTRAINT answers_score_check CHECK ((score = ANY (ARRAY[0, 1, 2, 3, 4, 5])))
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answers_id_seq OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forms (
    id integer NOT NULL,
    form_type character varying(100) NOT NULL,
    monitoring_number character varying(100),
    organisation_name character varying(255),
    project_name character varying(255),
    program character varying(255),
    region character varying(100),
    sub_municipal character varying(100),
    facility_visited character varying(255),
    location character varying(255),
    respondents text,
    monitoring_team text,
    team_members text,
    general_comments text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.forms OWNER TO postgres;

--
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.forms_id_seq OWNER TO postgres;

--
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question_text text NOT NULL,
    program text NOT NULL,
    question_number integer NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (86, 43, NULL, NULL, 'Poor', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (87, 43, NULL, NULL, 'Poor', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (88, 43, NULL, NULL, 'Poor', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (89, 43, NULL, NULL, 'Poor', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (170, 52, NULL, NULL, 'Credit', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (171, 52, NULL, NULL, 'Credit', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (172, 52, NULL, NULL, 'Credit', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (173, 52, NULL, NULL, 'Credit', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (182, 45, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (183, 45, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (184, 45, NULL, NULL, 'Credit', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (185, 45, NULL, NULL, 'Credit', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (186, 53, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (187, 53, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (188, 53, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (189, 53, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (190, 46, NULL, NULL, 'Good', 0, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (191, 46, NULL, NULL, 'Good', 0, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (192, 46, NULL, NULL, 'Excellent', 0, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (193, 46, NULL, NULL, 'Better', 0, NULL, 'No', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (198, 54, NULL, NULL, 'Credit', 3, NULL, 'No', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (199, 54, NULL, NULL, 'Good', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (200, 54, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (201, 54, NULL, NULL, 'Poor', 2, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (206, 56, 171, NULL, 'Credit', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (207, 56, 172, NULL, 'Credit', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (208, 56, 173, NULL, 'Credit', 1, NULL, 'Yes', NULL);
INSERT INTO public.answers (id, form_id, question_id, response, remark, score, question_text, answer, question_number) VALUES (209, 56, 174, NULL, 'Credit', 1, NULL, 'Yes', NULL);


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (1, 'Clinical Care', 'CC-001', 'Health Org', 'Project Alpha', 'Program X', 'Greater Accra', 'Ablekuma North', 'Ablekuma Health Center', 'Accra', 'Dr. Jane Doe', 'Regional Health Team', 'John, Paul, Mary', 'All procedures followed properly.', '2025-06-17 02:46:37.196409');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (2, 'GHS', '123', 'AYAWASO ', 'IMASS', 'Clinical Care ', 'Greater Accra ', 'kotobabi ', 'anthon ', 'kotobabi ', 'Mensah ', 'team a ', 'k, g, t ', 'Great things ', '2025-06-17 02:56:51.996043');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (61, 'First Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Nutrition Services', 'Nutrition Services', 'Greater Accra', 'Kokomlemle', 'Tip Toe CHPS', 'Kokomlemle', 'Michael Owusu', 'Team D', 'Esi, Ama, John', 'Hospital is doing an Excellent work. hello', '2025-06-25 15:30:24.060271');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (63, 'Fourth Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Accra New Town', 'Ghanuba Specialist Hospital', 'Accra New Town', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'Testing ', '2025-06-26 09:36:43.248441');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (65, 'First Quarter', '2027', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon Memorial Hospital', 'Kotobabi', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'update
', '2025-06-26 10:36:51.119154');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (62, 'Second Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Nutrition Services', 'Nutrition Services', 'Greater Accra', 'Kotobabi', 'Anthon Memorial Hospital', 'Kotobabi', 'Kofi Manu', 'Team A', 'Asantewaa, Daniel, kofi', 'Testing ', '2025-06-26 09:12:28.874979');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (64, 'Third Quarter', '2025', 'Ayawaso Municipal Health Directorate', '', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon Memorial Hospital', 'Kotobabi', 'Mensah ', 'Team C', 'Asantewaa, Daniel, kofi', 'Testing ', '2025-06-26 10:31:12.505842');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (38, 'First Quarter', '2000', 'Ayawaso Municipal Health Directorate', 'Integrated Monitoring and Supportive Supervision', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon', 'Kotobabi', 'Kofi Manu', 'Team G', 'Asantewaa, Daniel, kofi', 'Let me know if you''d like:

Admin dashboard integration for these routes

Editing UI for edit.html

Print page for submitted forms

Charts or form analytics

You''re very close to a full professional data collection system.', '2025-06-24 14:04:13.883055');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (39, 'First Quarter', '2001', 'Ayawaso Municipal Health Directorate', 'Integrated Monitoring and Supportive Supervision', 'Mental Health', 'Greater Accra', 'Alajo', 'richsound', 'Alajo', 'Mensah ', 'Team B', 'k, g, t ', 'kkkkkk', '2025-06-24 14:06:44.527033');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (40, 'First Quarter', '2021', 'Ayawaso Municipal Health Directorate', 'Integrated Monitoring and Supportive Supervision', 'Mental Health', 'Greater Accra', 'Accra New Town', 'Ghanuba Specialist Hospital', 'Accra New Town', 'Mensah ', 'Team B', 'k, g, t ', 'kkkk', '2025-06-24 14:30:30.091069');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (41, 'First Quarter', '2001', 'Ayawaso Municipal Health Directorate', 'Integrated Monitoring and Supportive Supervision', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon', 'Kotobabi', 'Mensah ', 'Team A', 'k, g, t ', 'ddd', '2025-06-24 14:45:25.886193');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (43, 'First Quarter', '2023', 'Ayawaso Municipal Health Directorate', 'Integrated Monitoring and Supportive Supervision', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon', 'Kotobabi', 'Mensah ', 'Team A', 'k, g, t ', 'lllll', '2025-06-24 19:37:08.69575');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (52, 'Fourth Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon', 'Kotobabi', 'Mensah ', 'Team C', 'Asantewaa, Daniel, kofi', 'Updated ', '2025-06-25 03:35:06.009337');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (45, 'Second Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Alajo', 'richsound', 'Alajo', 'Mensah ', 'Team B', 'Asantewaa, Daniel, kofi', 'Updated right ', '2025-06-24 20:24:11.91944');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (53, 'Second Quarter', '2025', 'Ayawaso Municipal Health Directorate', '', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon', 'Kotobabi', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'Updating 111111', '2025-06-25 03:40:03.704914');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (46, 'Second Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Alajo', 'richsound', 'Alajo', 'Mensah ', 'Team A', 'AA,AB,BC', 'udating ', '2025-06-24 20:25:56.184929');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (54, 'Third Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Kokomlemle', 'tobinco', 'Kokomlemle', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'Updated ', '2025-06-25 04:00:48.376484');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (55, 'Fourth Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Effan Victory Clinic', 'Kotobabi', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'Test updated', '2025-06-25 14:00:26.147489');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (56, 'First Quarter', '26', 'Ayawaso Municipal Health Directorate', 'Integrated Monitoring and Supportive Supervision', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Life View Medical Hospital', 'Kotobabi', 'Mensah ', 'Team B', 'Asantewaa, Daniel, kofi', 'Testing now ', '2025-06-25 14:20:44.246192');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (57, 'First Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Kotobabi', 'Anthon Memorial Hospital', 'Kotobabi', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'Testing updates ', '2025-06-25 14:23:34.736993');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (58, 'Fourth Quarter', '2025', 'Ayawaso Municipal Health Directorate', 'Mental Health', 'Mental Health', 'Greater Accra', 'Kokomlemle', 'Entrance University Hospital', 'Kokomlemle', 'Mensah ', 'Team B', 'Asantewaa, Daniel, kofi', 'Updated now ... ', '2025-06-25 14:50:06.620596');
INSERT INTO public.forms (id, form_type, monitoring_number, organisation_name, project_name, program, region, sub_municipal, facility_visited, location, respondents, monitoring_team, team_members, general_comments, created_at) VALUES (60, 'Fourth Quarter', '2025', 'Ayawaso Municipal Health Directorate', '', 'Mental Health', 'Greater Accra', 'Accra New Town', 'Medylife Healthcare (Clinix)', 'Accra New Town', 'Mensah ', 'Team A', 'Asantewaa, Daniel, kofi', 'updating ', '2025-06-25 15:20:02.64864');


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.questions (id, question_text, program, question_number) VALUES (12, 'Availability of standard treatment guidelines (2 marks)', 'Clinical Care', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (13, 'Availability of Essential Medicines list (1 mark)', 'Clinical Care', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (14, 'Availability of referral form (3 marks)', 'Clinical Care', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (15, 'Is diagnosis, treatments and other clinical procedures documented in patients’ folders? (Sample a folder for evidence) (2 marks)', 'Clinical Care', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (16, 'Are drugs prescribed in their generic names? (verify from folder) (2 marks)', 'Clinical Care', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (17, 'Availability of a consulting room register (check if it is updated) (1 mark)', 'Clinical Care', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (18, 'Is daily tally of morbidity returns done? (see evidence) (1 mark)', 'Clinical Care', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (19, 'Is daily tally of statement of outpatients’ returns done? (see evidence) (1 mark)', 'Clinical Care', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (20, 'Neat environment (2 marks)', 'Quality Assurance', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (21, 'Puncture proof container for waste disposal (2 marks)', 'Quality Assurance', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (22, 'Availability of waste disposal site (1 mark)', 'Quality Assurance', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (23, 'Availability of Hand washing protocol (check for poster) (1 mark)', 'Quality Assurance', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (24, 'Veronica bucket with water / running water, soap, towel etc. (1 mark)', 'Quality Assurance', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (25, 'Is there privacy and confidentiality in the facility for patients? (Observe consulting room for evidence) (1 mark)', 'Quality Assurance', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (26, 'Knowledge on dilution of chlorine (strength) (1 mark)', 'Quality Assurance', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (27, 'Sterilization of articles (instrument/material) (1 mark)', 'Quality Assurance', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (28, 'Availability of Emergency Response Team? (Check minutes) (1 mark)', 'Standards, Protocols and Guidelines', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (29, 'Availability of a joint duty roster/Itinerary? (Check for the roster for the past 6 months) (1 mark)', 'Standards, Protocols and Guidelines', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (30, 'Have you made arrangement with any hospital in case of referral? (Check for evidence) (1 mark)', 'Standards, Protocols and Guidelines', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (31, 'Patient Charter (1 mark)', 'Standards, Protocols and Guidelines', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (32, 'Patient Rights and Responsibilities (1 mark)', 'Standards, Protocols and Guidelines', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (33, 'Code of Ethics (1 mark)', 'Standards, Protocols and Guidelines', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (34, 'Code of conduct and disciplinary procedures (1 mark)', 'Standards, Protocols and Guidelines', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (35, 'Infection Prevention & Control Guidelines / Protocol (1 mark)', 'Standards, Protocols and Guidelines', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (36, 'CHPS Implementation Guidelines (1 mark)', 'Standards, Protocols and Guidelines', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (37, 'Standard Treatment Guidelines (1 mark)', 'Standards, Protocols and Guidelines', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (38, 'Essential Medicine List (1 mark)', 'Standards, Protocols and Guidelines', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (39, 'Occupational Health policy & Guidelines (1 mark)', 'Standards, Protocols and Guidelines', 12);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (40, 'Triage System in Health facility (1 mark)', 'Standards, Protocols and Guidelines', 13);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (41, 'Availability of ADR form (1 mark)', 'Standards, Protocols and Guidelines', 14);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (42, 'Does the facility offer PMTCT/CT services? (0 mark)', 'HIV/AIDS Control', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (43, 'Availability of a trained counsellor (0 mark)', 'HIV/AIDS Control', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (44, 'Availability of HIV counseling aides? (flip chart) (1 mark)', 'HIV/AIDS Control', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (45, 'Are registers well filled and kept? (ART, PMTCT, HTC) (1 mark)', 'HIV/AIDS Control', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (46, 'Availability of PEP protocol? (1 mark)', 'HIV/AIDS Control', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (47, 'Are protocols for testing available? (3 Test algorithm) (1 mark)', 'HIV/AIDS Control', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (48, 'Does the facility implement DSD? If Yes, at what point? (1 mark)', 'HIV/AIDS Control', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (49, 'Number of clients (PWs) tested at 34 weeks (1 mark)', 'HIV/AIDS Control', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (50, 'Any HIV client on ARV? Are ARVs available at the facility? (1 mark)', 'HIV/AIDS Control', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (51, 'Availability of 1st response test kit, OraQuick, and SD Bioline (verify from bin card) (1 mark)', 'HIV/AIDS Control', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (52, 'How are viral load and EID samples transported? (Any evidence?) (1 mark)', 'HIV/AIDS Control', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (53, 'What is the total population of the CHPS zone?', 'CHPS/MCHNP', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (54, 'How many of the health staff in the CHPS zones have been trained as CHOs?', 'CHPS/MCHNP', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (55, 'How many health staff are in this facility? (List category of the staff)', 'CHPS/MCHNP', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (56, 'How many communities does the facility serve?', 'CHPS/MCHNP', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (57, 'How many CHVs are there in the area?', 'CHPS/MCHNP', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (58, 'How many CHVs are active and working?', 'CHPS/MCHNP', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (59, 'How many pregnant women have you registered? (Expected Preg. = 4% x total population; check "Know Your Pregnant Women" book)', 'CHPS/MCHNP', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (60, 'Do you conduct deliveries? If yes, record the number. Verify logistics and equipment.', 'CHPS/MCHNP', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (61, 'Number of FP registrants.', 'CHPS/MCHNP', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (62, 'How many children (0–59 months) have you registered? (Expected = 20% x total population; check "Know Your U5" book)', 'CHPS/MCHNP', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (63, 'Have you been supervising CHVs? Explain how, and check if CHVs submit monthly reports to the CHO.', 'CHPS/MCHNP', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (64, 'When last did the DHA and sub-district supervisor visit you? (Check visitor’s book for findings or feedback)', 'CHPS/MCHNP', 12);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (65, 'Do you have your home visit activity plan? (Check for priority households and coverage of all communities)', 'CHPS/MCHNP', 13);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (66, 'Does the facility itinerary include home visits to all communities?', 'CHPS/MCHNP', 14);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (67, 'How many households have you visited? (Check home visit book; expected: 96 households/month x number of months)', 'CHPS/MCHNP', 15);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (68, 'Do you have a functional Community Health Management Committee (CHMC)? If not, explain.', 'CHPS/MCHNP', 16);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (69, 'How many meetings have you had with CHMC members this year? (Check minutes, key issues, and attendance sheet)', 'CHPS/MCHNP', 17);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (70, 'Have you applied any Participatory Learning Activity (PLA) tools? (e.g., Pairwise ranking, pie chart, bar chart; check developed tools)', 'CHPS/MCHNP', 18);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (71, 'Availability of Community Health Action Plan (CHAP)/Displayed. If not, provide sample and teach CHO.', 'CHPS/MCHNP', 19);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (72, 'How many pregnant women did you refer? (e.g., for delivery)', 'CHPS/MCHNP', 20);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (73, 'How many schools do you have?', 'CHPS/MCHNP', 21);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (74, 'Number of schools visited.', 'CHPS/MCHNP', 22);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (75, 'Number of children screened.', 'CHPS/MCHNP', 23);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (76, 'Number of children with suspected diseases.', 'CHPS/MCHNP', 24);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (77, 'Action taken by health staff.', 'CHPS/MCHNP', 25);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (78, 'Are you supporting any MAM/SAM cases? (How many?)', 'CHPS/MCHNP', 26);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (79, 'Have you carried out SBCC? If yes, list the topics and target groups.', 'CHPS/MCHNP', 27);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (80, 'How many durbars have you conducted?', 'CHPS/MCHNP', 28);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (81, 'Do you promote healthy lifestyle? If yes, explain how and show documentation.', 'CHPS/MCHNP', 29);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (82, 'How many hypertensive clients are you supporting? (Check records)', 'CHPS/MCHNP', 30);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (83, 'Number of outreach services conducted.', 'CHPS/MCHNP', 31);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (84, 'Has the facility received MCHNP funds between January–March 2020? (Check records of income and expenditure)', 'CHPS/MCHNP', 32);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (85, 'Are there some challenges to share? (Document if possible by team)', 'CHPS/MCHNP', 33);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (86, 'Are there success stories to share? (Document if possible by team)', 'CHPS/MCHNP', 34);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (87, 'Availability of malaria case management protocol (2 marks)', 'Malaria Elimination', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (88, 'Availability of RDTs for malaria diagnosis (check stock) (1 mark)', 'Malaria Elimination', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (89, 'Are all suspected malaria cases tested before treated? (verify) (2 marks)', 'Malaria Elimination', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (90, 'Availability of records on the use of RDTs (verify) (1 mark)', 'Malaria Elimination', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (91, 'Availability of ACTs in stock (verify from bin card) (1 mark)', 'Malaria Elimination', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (92, 'Availability of SP drugs in stock (verify from bin card) (1 mark)', 'Malaria Elimination', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (93, 'SP administration from 16 weeks of gestation under DOT (1 mark)', 'Malaria Elimination', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (94, 'Availability of LLIN (verify from bin card) (1 mark)', 'Malaria Elimination', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (95, 'Does the facility conduct delivery? (0 mark)', 'Reproductive and Child Health', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (96, 'Availability of detergents (bleach, soap etc.) (1.5 mark)', 'Reproductive and Child Health', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (97, 'Availability of labor drugs (verify) (0 mark)', 'Reproductive and Child Health', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (98, 'Are the following protocols available and in use? (Check for at least 4): i. Eclampsia (0.5 mark), ii. PPH (0.5 mark), iii. APH (0.5 mark), iv. Convulsion (0.5 mark), v. Neonatal Sepsis (0.5 mark), vi. Resuscitation of New Borns (0.5 mark), vii. Asphyxia (0.5 mark)', 'Reproductive and Child Health', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (99, 'Evidence of home visits in the last month (1 mark)', 'Reproductive and Child Health', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (100, 'Evidence of school health sessions in the last month (1 mark)', 'Reproductive and Child Health', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (101, 'Availability of contraceptives (verify from bin cards) (3 marks)', 'Reproductive and Child Health', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (102, 'Availability of FP wheel? (see evidence) (1 mark)', 'Reproductive and Child Health', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (103, 'Availability of FP register and daily logbook? (1 mark)', 'Reproductive and Child Health', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (104, 'Is the FP register and logbook updated? (1 mark)', 'Reproductive and Child Health', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (105, 'Continuous registration of long term FP methods (1 mark)', 'Reproductive and Child Health', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (106, 'Availability of inventory cards on all FP commodities (2 marks)', 'Reproductive and Child Health', 12);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (107, 'Availability of ANC Register (check if filled & updated) (1 mark)', 'Reproductive and Child Health', 13);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (108, 'Availability of MCHRB and corresponding inventory (1 mark)', 'Reproductive and Child Health', 14);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (109, 'Is the standard PNC register in use? (verify) (1 mark)', 'Reproductive and Child Health', 15);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (110, 'Is the PNC register filled correctly & updated? (1 mark)', 'Reproductive and Child Health', 16);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (111, 'Do RCH reports match with source documents? (1 mark)', 'Reproductive and Child Health', 17);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (112, 'Is the labour/delivery room in good condition? (0 mark)', 'Reproductive and Child Health', 18);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (113, 'Is labour room equipped with neonatal resuscitation (e.g., suction kit, ambubag, oxygen cylinders)? (0 mark)', 'Reproductive and Child Health', 19);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (114, 'Availability of emergency tray and pack? (0 mark)', 'Reproductive and Child Health', 20);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (115, 'Availability of vital signs apparatus (2 marks)', 'Reproductive and Child Health', 21);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (116, 'Screening for contraindications for IPT (0 mark)', 'Reproductive and Child Health', 22);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (117, 'Oxytocin stored in temperature as per protocol (0 mark)', 'Reproductive and Child Health', 23);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (118, 'MNCH staff trained on life-saving skills (0 mark)', 'Reproductive and Child Health', 24);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (119, 'All MNCH staff trained on safe motherhood protocols in the last 2 years (0 mark)', 'Reproductive and Child Health', 25);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (120, 'Total number of demarcated CHPS zones equal to or higher than total number of electoral zones in the sub-district (show evidence) (1 mark)', 'Reproductive and Child Health', 26);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (121, 'Check whether CHPS Reports are available (Quarterly) (1 mark)', 'Reproductive and Child Health', 27);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (122, 'Facility monthly CHPS review meeting (show evidence) (1 mark)', 'Reproductive and Child Health', 28);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (123, 'Check on the availability of copies of CHAP of the catchment areas within the CHPS zone (1 mark)', 'Reproductive and Child Health', 29);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (124, 'How many outreach sessions were conducted in the last quarter? (1 mark)', 'Reproductive and Child Health', 30);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (125, 'How many community health committee (CHC) meetings were held in the last quarter? (1 mark)', 'Reproductive and Child Health', 31);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (126, 'Is evidence of written report available from the CHC meetings? (1 mark)', 'Reproductive and Child Health', 32);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (127, 'Availability of breastfeeding policy? (Check if it is pasted) (0 mark)', 'Nutrition Services', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (128, 'Availability of ten steps to successful breastfeeding? (Check if it is pasted) (2 marks)', 'Nutrition Services', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (129, 'Check for the availability of the following equipment: Hanging scale (1 mark), Adult scale (1 mark), MUAC tape (1 mark), Stadiometer/height measuring device (1 mark)', 'Nutrition Services', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (130, 'Availability of growth monitoring register and tally sheet (1 mark)', 'Nutrition Services', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (131, 'Check for the availability of the following supplements: Vitamin A capsules (1 mark), Folic acid tablets (1 mark), Iron tablets (1 mark)', 'Nutrition Services', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (132, 'Is the Vitamin A monitoring chart up to date? (1 mark)', 'Nutrition Services', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (133, 'Does the monthly nutrition report match the source document? (1 mark)', 'Nutrition Services', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (134, 'Availability of SOP on Health Information Management (1 mark)', 'Health Information Management', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (135, 'Is the OPD register available and completed correctly? (1 mark)', 'Health Information Management', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (136, 'Is the Consulting Room register available and completed correctly? (1 mark)', 'Health Information Management', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (137, 'Is the FP register available and completed correctly? (1 mark)', 'Health Information Management', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (138, 'Is the ANC register available and completed correctly? (1 mark)', 'Health Information Management', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (139, 'Is the Postnatal register available and completed correctly? (1 mark)', 'Health Information Management', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (140, 'Is the CWC register available and completed correctly? (1 mark)', 'Health Information Management', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (141, 'Is the Deliveries register available and completed correctly? (1 mark)', 'Health Information Management', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (142, 'Availability of files for copies of monthly reports submitted (1 mark)', 'Health Information Management', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (143, 'Are there filed copies of blank reporting forms? (1 mark)', 'Health Information Management', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (144, 'Are clients’ folders filed correctly? (1 mark)', 'Health Information Management', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (145, 'Availability of bulletin board for posting health information (1 mark)', 'Health Information Management', 12);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (146, 'Is information being captured in other books apart from source registers? (If Yes, 0 mark; If No, 2 marks)', 'Health Information Management', 13);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (147, 'Availability of health promotion posters in the facility (2 marks)', 'Health Promotion', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (148, 'Evidence of health promotion sessions in the last month (2 marks)', 'Health Promotion', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (149, 'Evidence of community durbars in the last 3 months (1 mark)', 'Health Promotion', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (150, 'Evidence of advocacy meetings organized with stakeholders in the last quarter (2 marks)', 'Health Promotion', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (151, 'Availability of ledger books (NHIS / cash and carry ledgers) (1 mark)', 'Financial Management', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (152, 'Availability of GCRs (1 mark)', 'Financial Management', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (153, 'Are GCRs issued to clients for cash payments? (verify) (1 mark)', 'Financial Management', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (154, 'Availability of updated medicines price list (1 mark)', 'Financial Management', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (155, 'Availability of prescription/dispensary register (1 mark)', 'Financial Management', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (156, 'Availability of NHIS claims forms, folders, ID cards etc. (1 mark)', 'Financial Management', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (157, 'Are claims forms filled correctly? (1 mark)', 'Financial Management', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (158, 'Availability of a file for receipts and IGF monthly reports (1 mark)', 'Financial Management', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (159, 'Availability of expired drugs (If Yes, 0 mark; If No, 2 marks)', 'Financial Management', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (160, 'Knowledge of outstanding payments from NHIS (1 mark)', 'Financial Management', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (161, 'Knowledge of indebtedness to RMS (drugs and non-drugs) (1 mark)', 'Financial Management', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (162, 'Availability of inventory control cards (bin cards) (1 mark)', 'Management of Stores and Supplies', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (163, 'Does every commodity have a bin card? (verify) (1 mark)', 'Management of Stores and Supplies', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (164, 'Are inventory control cards updated? (verify) (1 mark)', 'Management of Stores and Supplies', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (165, 'Availability of worksheet (verify) (1 mark)', 'Management of Stores and Supplies', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (166, 'Is the Maximum stock, Re-order quantity and Emergency quantity of commodities indicated on their bin cards? (1 mark)', 'Management of Stores and Supplies', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (167, 'Availability of file for receipts from medical stores (1 mark)', 'Management of Stores and Supplies', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (168, 'Do you conduct monthly stock taking of commodities? (verify) (1 mark)', 'Management of Stores and Supplies', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (169, 'Are drugs stored on shelves and palettes? (1 mark)', 'Management of Stores and Supplies', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (170, 'Does quantity on bin cards tally with physical stock? (sample a few commodities) (1 mark)', 'Management of Stores and Supplies', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (171, 'Availability of monthly mental health reporting form (verify) (1 mark)', 'Mental Health', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (172, 'Are mental health talks given at OPD and outreach points? (verify from reports) (1 mark)', 'Mental Health', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (173, 'Do staff visit traditional healers and faith-based centres for mental health cases? (2 marks)', 'Mental Health', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (174, 'Has the facility referred any mental health case to the next level in the past 3 months? (verify from reports) (1 mark)', 'Mental Health', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (175, 'Availability of Community Health Committee (1 mark)', 'Management Practice', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (176, 'Does the community health committee hold meetings? How often? (verify from minutes) (1 mark)', 'Management Practice', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (177, 'Availability of action plan and itinerary (2 marks)', 'Management Practice', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (178, 'Are planned activities implemented? (2 marks)', 'Management Practice', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (179, 'Availability of annual report for previous year (verify) (2 marks)', 'Management Practice', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (180, 'Availability of attendance book (verify) (1 mark)', 'Management Practice', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (181, 'Availability of visitors book (verify) (1 mark)', 'Management Practice', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (182, 'Are facility meetings held? (verify from minutes) (1 mark)', 'Management Practice', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (183, 'Is there a log book of activities? (verify) (1 mark)', 'Management Practice', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (184, 'Number of community durbars organized in the quarter (1 mark)', 'Management Practice', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (185, 'Number of CHMC meetings held in the quarter (1 mark)', 'Management Practice', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (186, 'Has staff been given standard/refresher training since the last quarter? (2 marks)', 'Management Practice', 12);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (187, 'What is the sanitation situation in the facility? 0-Very poor ☐ 1-Poor ☐ 2-Good ☐ 3-Very good ☐', 'Management Practice', 13);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (188, 'Total population', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 1);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (189, 'Population Under 1 year', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 2);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (190, 'Population Under 12-23 months', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 3);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (191, 'Total CHNs', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 4);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (192, 'Total TO/FTs', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 5);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (193, 'Is there a plan that covers EPI', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 6);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (194, 'How many outreaches were plan for last month', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 7);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (195, 'How many of the outreaches planned were implemented for last month', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 8);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (196, 'Has there been program review meeting for the last quarter', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 9);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (197, 'Is there a vaccine available in the facility?', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 10);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (198, 'Is the refrigerator temperature maintained between +2 and +8', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 11);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (199, 'Check thermometer reading in vaccine refrigerator and take device outside to assess its functionality', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 12);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (200, 'Is the temperature monitoring chart updated to date (check for evidence)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 13);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (201, 'Availability of fridge guard for all refrigerators and freezers', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 14);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (202, 'Are there expired /VVM 3&4 vaccines kept in the fridge?', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 15);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (203, 'Are vaccines arranged appropriately in the refrigerator', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 16);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (204, 'Is there any unauthorized substance stored in the refrigerator', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 17);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (205, 'Is there a contingency plan in the event of power outage', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 18);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (206, 'Did the facility experience stock-out of any vaccine in the past 3 months', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 19);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (207, 'Is there Vaccine ledger in the facility', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 20);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (208, 'Is the vaccine ledger appropriately updated', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 21);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (209, 'Does the physical stock of the vaccine in the fridge match with ledger records (use MR and BCG) check diluents as well', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 22);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (210, 'Are immunization monitoring charts available in the facility', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 23);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (211, 'Are the immunization monitoring charts correctly drawn', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 24);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (212, 'Does the facility have the Maternal and Child Health Record Books', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 25);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (213, 'Does the facility have the EPI tally book', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 26);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (214, 'Are records done appropriately in the tally book', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 27);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (215, 'Are tally done correctly', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 28);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (216, 'Are vaccines used recorded in the tally book', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 29);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (217, 'Are monthly reports of the facility available', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 30);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (218, 'Is there a gap between the following (If yes ask for the reason)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 31);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (219, 'PENTA 1 and OPV 1', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 32);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (220, 'PENTA 2 and OPV 2', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 33);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (221, 'PENTA 3 and OPV 3', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 34);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (222, 'PENTA 1 and ROTA 1', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 35);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (223, 'PENTA 2 and ROTA 2', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 36);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (224, 'PENTA 3 and ROTA 3', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 37);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (225, 'MR 1 and YF', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 38);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (226, 'MR 2 and MenA', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 39);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (227, 'Are EPI performance monitoring charts available', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 40);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (228, 'Are EPI performance monitoring charts updated? (check for three months)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 41);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (229, 'Are there areas of low access of less than 90% coverage of antigens identified?', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 42);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (230, 'Does the facility have utilization problem (drop-out more than 10%)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 43);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (231, 'Is there negative drop-out rate (probe for reason if yes)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 44);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (232, 'Is the EPI data captured in DHIMS 2', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 45);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (233, 'Is there variation between report in DHIMS 2 and reporting forms (Check)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 46);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (234, 'Match number vaccinated against doses used/opened (Is it consistent)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 47);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (235, 'Match number of AD syringes 0.5 used with antigens and 0.05 with BCG (is it consistent)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 48);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (236, 'Are tally cards used for all logistics', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 49);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (237, 'Has there been any shortage of safety boxes in the last three months', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 50);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (238, 'Are monthly vaccination report forms available', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 51);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (239, 'Is there an incinerator (If yes inspect the site for disposing syringes and comment.)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 52);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (240, 'If no incinerator, is there a pit for burning (if there is a pit inspect the site)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 53);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (241, 'If no pit, how are injection wastes disposed of (inspect the site)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 54);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (242, 'Has there been any formal community engagement for the last three months on EPI', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 55);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (243, 'Has there been any home visit/defaulter tracing in the last month (check home visit books)', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 56);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (244, 'Does the facility have updated AEFI forms', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 57);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (245, 'Does the facility have updated AEFI investigation forms', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 58);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (246, 'Does the facility have updated AEFI guidelines/job aid', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 59);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (247, 'Does the facility monitor AEFI', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 60);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (248, 'Does AEFI report match with those reported in DHIMS', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 61);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (249, 'Are there case definitions for AFP, NNT, YF and Measles', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 62);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (250, 'Are there files for Polio Eradication activities and other VPDs under surveillance available', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 63);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (251, 'Is there a spot map or chart showing VPDs in the area', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 64);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (252, 'Have you recorded any outbreak/epidemic', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 65);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (253, 'Was the outbreak/epidemic investigated', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 66);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (254, 'Is the 2YL interventions algorithm available', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 67);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (255, 'Have the staff been oriented on the 2YL algorithm', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 68);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (256, 'Can staff demonstrate understanding of the 2YL interventions algorithm', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 69);
INSERT INTO public.questions (id, question_text, program, question_number) VALUES (257, 'Are there communication materials on 2YL interventions', 'Expanded Program of Immunisation, Surveillance and Tuberculosis', 70);


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answers_id_seq', 255, true);


--
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forms_id_seq', 65, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 257, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: answers answers_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

