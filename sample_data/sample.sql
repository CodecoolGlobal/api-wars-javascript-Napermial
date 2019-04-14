ALTER TABLE IF EXISTS ONLY public.user_list DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;

DROP TABLE IF EXISTS public.user_list;
DROP SEQUENCE IF EXISTS public.user_id_seq;
CREATE TABLE user_list (
    id serial NOT NULL,
    user_name text,
    password char(60)
);


ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS pk_planet_votes CASCADE;

DROP TABLE IF EXISTS public.planet_votes;
DROP SEQUENCE IF EXISTS public.planet_votes_seq;
CREATE TABLE planet_votes (
    id serial NOT NULL,
    planet_id integer,
    planet_name char(20),
    user_id integer,
    registration_time timestamp without time zone
);

ALTER TABLE ONLY user_list
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_list(id) ON DELETE CASCADE;