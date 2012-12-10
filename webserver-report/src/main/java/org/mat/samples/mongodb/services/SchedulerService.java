package org.mat.samples.mongodb.services;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.mat.samples.mongodb.policy.SchedulerPolicy;
import org.mat.samples.mongodb.vo.Scheduler;
import org.quartz.SchedulerException;

/**
 * User: E010925
 * Date: 06/12/12
 * Time: 09:22
 */
@Path("/schedulers")
@Produces(MediaType.APPLICATION_JSON)
public class SchedulerService {

    @GET
    public List<Scheduler> listSchedulers(){
        List<Scheduler> schedulers = SchedulerPolicy.listSchedulers();
        return schedulers;
    }

    @POST
    public String addScheduler(Scheduler scheduler) throws IOException, SchedulerException {
    	String schedulerId = SchedulerPolicy.addScheduler(scheduler);
    	return schedulerId;
    }

    /**
     * Will be used to update the scheduler,
     * either its definition, either its status (Constants.STATUS_RUNNING, Constants.STATUS_STOPPED)
     * @param scheduler
     * @param schedulerId
     * @return ok or not to be displayed on the user interface.
     * @throws IOException 
     * @throws JsonMappingException 
     * @throws JsonGenerationException 
     */
    @POST
    @Path("/{schedulerId}")
    public boolean updateScheduler(Scheduler scheduler, @PathParam("schedulerId") String schedulerId) throws  IOException{
    	boolean done = SchedulerPolicy.updateScheduler(schedulerId, scheduler);
        return done;
    }
}
