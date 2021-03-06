package org.mat.samples.mongodb.services;

import org.mat.samples.mongodb.Constants;
import org.mat.samples.mongodb.policy.MonitorPolicy;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/monitor", loadOnStartup = 1)
public class MonitorServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {

            String action = request.getParameter("action");
            String as = request.getParameter("as");
            String server = request.getParameter("server");
            String applicationName = request.getParameter("applicationName");

            response.setContentType("application/json");
            if ("available-memory".equals(action)) {
                MonitorPolicy.requestMemory(Constants.MEM_AVAILABLE, applicationName, server, as, response.getOutputStream());
            } else if ("total-memory".equals(action)) {
                MonitorPolicy.requestMemory(Constants.MEM_TOTAL, applicationName, server, as, response.getOutputStream());
            } else if ("free-memory".equals(action)) {
                MonitorPolicy.requestMemory(Constants.MEM_FREE, applicationName, server, as, response.getOutputStream());
            } else if ("max-memory".equals(action)) {
                MonitorPolicy.requestMemory(Constants.MEM_MAX, applicationName, server, as, response.getOutputStream());
            } else if ("used-connections".equals(action)) {
                String ds = request.getParameter("idObject");
                MonitorPolicy.requestUsedConnection(ds, applicationName, server, as, response.getOutputStream());
            } else if ("threads".equals(action)) {
                MonitorPolicy.requestTotalThreads(applicationName, server, as, response.getOutputStream());
            }
            response.flushBuffer();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}