查询点周围一定半径的线路合集
select * from (select a."LID" as sid,a.the_geom as sgeom,b."LID" as eid,b.the_geom as egeom,a."LID"=b."LID" as sameroute from
(select "LID",the_geom from line where st_intersects(st_buffer(st_geomfromtext('POINT(116.06209 24.36578)',4610),0.003),the_geom)) as a,
(select "LID",the_geom from line where st_intersects(st_buffer(st_geomfromtext('POINT(116.06209 24.36578)',4610),0.003),the_geom)) as b)as b order by sameroute desc


