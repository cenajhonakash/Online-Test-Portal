package com.universityTest.Utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtility {

	public static Logger getLogger(Class classname) {
		return LoggerFactory.getLogger(classname);
	}
}
