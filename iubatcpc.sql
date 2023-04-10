-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2022 at 03:26 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iubatcpc`
--
CREATE DATABASE IF NOT EXISTS `iubatcpc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `iubatcpc`;

-- --------------------------------------------------------

--
-- Table structure for table `currentmember`
--

CREATE TABLE `currentmember` (
  `cmId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL,
  `position` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `currentmember`
--

INSERT INTO `currentmember` (`cmId`, `name`, `email`, `image`, `position`) VALUES
(2, 'Nazmul Kabir', 'kabir@gmail.com', 'static\\img\\tushar.jpg', 'Executive'),
(3, 'Md Maruf Ahmed', 'maruf@gmail.com', 'static\\img\\maruf.jpg', 'Executive'),
(4, 'Emrul Hasan Emon', 'emrul@gmail.com', 'static\\img\\emrul.jpg', 'Executive'),
(5, 'Yousuf Hassan', 'yousuf@gmail.com', 'static\\img\\yousuf.jpg', 'Executive'),
(6, 'Shahidul Alam', 'shahidul@gmail.com', 'static\\img\\shahidul.jpg', 'Executive'),
(7, 'Abdullah Miraz', 'abdullah@gmail.com', 'static\\img\\AbdullahMiraz.jpg', 'General'),
(8, 'Jumael Ahmed', 'jumael@gmail.com', 'static\\img\\jumael.jpg', 'General'),
(9, 'Masum Billah', 'masum@gamil.com', 'static\\img\\masum.jpg', 'General');

-- --------------------------------------------------------

--
-- Table structure for table `problem`
--

CREATE TABLE `problem` (
  `pid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `statement` text NOT NULL,
  `inputs` text NOT NULL,
  `outputs` text NOT NULL,
  `input` text NOT NULL,
  `output` text NOT NULL,
  `difficulties` varchar(30) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `solution` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `problem`
--

INSERT INTO `problem` (`pid`, `name`, `statement`, `inputs`, `outputs`, `input`, `output`, `difficulties`, `topic`, `solution`) VALUES
(1, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.', '<p>Take n in first line next line n numbers of input Then a Target</p>       <p>2 <= nums.length <= 10<sup>4</sup> </p>\n\n-10<sup>9</sup> <= target <= 10<sup>9</sup>', 'Gives the Indexes of pair that make the target sum', '<p>4</p>\n<p>2 7 11 15</p>\n<p>9</p>', '0 1', 'Easy', 'two pointer', '\n#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++)\n    {\n        cin >> nums[i];\n    }\n    int target;\n    cin >> target;\n    int a=0;\n    int b=0;\n    for(int i=0; i<nums.size()-1; i++)\n    {\n        for(int j=i+1; j<nums.size(); j++)\n        {\n            if(nums[i]+nums[j]==target)\n            {\n                a=i;\n                b=j;\n            }\n        }\n    }\n\n    cout << a << \" \" << b<< endl;\n\n}\n'),
(2, 'Print number', '<p><b>Write</b> a program that print numbers 1 to N</p>', '<p>Take input from user</p>', '<p>Each line print Number</p>', '<p>5</p>', '<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p>', 'Easy', 'loop', '#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int n;\n    cin >> n;\n    for(int i = 1; i<= n; i++)\n    {\n        cout << i << endl;\n    }\n    \n    return 0;\n}'),
(3, 'Palindrome Number', '<p>Given an integer x, return true<i> if </i>x<i> is a <strong>palindrome</strong>, and </i>false<i> otherwise</i>.</p>', '<p>Take a number from user</p>', '<p>Print YES if it is a palindrome, otherwise NO</p>', '<p>121</p>', '<p>YES</p>', 'Easy', 'palindrome', '#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int x;\n    cin >> x;\n\n    if (x < 0 || (x % 10 == 0 && x != 0))\n        cout << \"NO\" << endl;\n    int rev = 0;\n    while (rev < x)\n    {\n        rev = rev * 10 + x % 10;\n        x /= 10;\n    }\n\n    if(x == rev || x == rev / 10)\n    {\n        cout << \"YES\" << endl;\n    }\n    else\n    {\n        cout << \"NO\" << endl;\n    }\n\n\n}\n');

-- --------------------------------------------------------

--
-- Table structure for table `seniors`
--

CREATE TABLE `seniors` (
  `seniorsId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `jobStatus` varchar(100) NOT NULL,
  `picture` text NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seniors`
--

INSERT INTO `seniors` (`seniorsId`, `name`, `jobStatus`, `picture`, `email`) VALUES
(2, 'Saidur Rahman Akash', 'Software Engineer at iBOS', 'static\\img\\akash.jpg', 'Akash@gmail.com'),
(3, 'Plabon Biswas', 'Software Engineer at Orbitax', 'static\\img\\plabon.jpg', 'Plabon@gmail.com'),
(4, 'Debotush Dam', 'Software Engineer at Viasoft', 'static\\img\\Dam.jpg', 'Dam@gmail.com'),
(5, 'Ishmam Rahman Omi', 'Backend Software Engineer at BRAC IT', 'static\\img\\omi.jpg', 'Omi@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `sessiontbl`
--

CREATE TABLE `sessiontbl` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `suid` int(11) NOT NULL,
  `spid` int(11) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `ssolution` text DEFAULT NULL,
  `visitsolution` varchar(50) DEFAULT NULL,
  `acStatus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`suid`, `spid`, `status`, `ssolution`, `visitsolution`, `acStatus`) VALUES
(1, 2, 'Accepted', '#include<bits/stdc++.h>\r\nusing namespace std;\r\nint main()\r\n{\r\n    int n;\r\n    cin >> n;\r\n    for(int i = 1; i<= n; i++)\r\n    {\r\n        cout << i << endl;\r\n    }\r\n    \r\n    return 0;\r\n}', 'NO', 1),
(1, 3, 'Accepted', '#include<bits/stdc++.h>\r\nusing namespace std;\r\nint main()\r\n{\r\n    int n;\r\n    cin >> n;\r\n    for(int i = 1; i<= n; i++)\r\n    {\r\n        cout << i << endl;\r\n    }\r\n    \r\n    return 0;\r\n}', 'NO', 1),
(5, 3, 'Accepted', '#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int x;\n    cin >> x;\n\n    if (x < 0 || (x % 10 == 0 && x != 0))\n        cout << \"NO\" << endl;\n    int rev = 0;\n    while (rev < x)\n    {\n        rev = rev * 10 + x % 10;\n        x /= 10;\n    }\n\n    if(x == rev || x == rev / 10)\n    {\n        cout << \"YES\" << endl;\n    }\n    else\n    {\n        cout << \"NO\" << endl;\n    }\n\n\n}\n', 'NO', 1),
(7, 2, 'Worng', '#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int n;\n    cin >> n;\n    for(int i = 1; i<= n; i++)\n    {\n        cout << i+1 << endl;\n    }\n    \n    return 0;\n}', 'NO', 1),
(5, 2, 'Accepted', '#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int n;\n    cin >> n;\n    for(int i = 1; i<= n; i++)\n    {\n        cout << i << endl;\n    }\n    \n    return 0;\n}', 'NO', 1),
(5, 1, 'Accepted', '\n#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++)\n    {\n        cin >> nums[i];\n    }\n    int target;\n    cin >> target;\n    int a=0;\n    int b=0;\n    for(int i=0; i<nums.size()-1; i++)\n    {\n        for(int j=i+1; j<nums.size(); j++)\n        {\n            if(nums[i]+nums[j]==target)\n            {\n                a=i;\n                b=j;\n            }\n        }\n    }\n\n    cout << a << \" \" << b<< endl;\n\n}\n', 'NO', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `cntac` int(11) DEFAULT NULL,
  `cntpoint` int(11) DEFAULT NULL,
  `cntwa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `password`, `cntac`, `cntpoint`, `cntwa`) VALUES
(5, 'karim', '$2a$10$O2AuYvTaMvYBq1ZDzV3iieSws3f8VKaAmAQhjpcWJvBBFVb6Bmsl2', 12, 120, 15),
(6, 'hasan', '$2a$10$EC5mm5J9bztqQ1u5bgtTSu/Kv4LJz1Ov/pSA6Kj5XL5lbG0zWEjBu', 0, 0, 0),
(7, 'suchana', '$2a$10$rQJ9R41Siu9Exr3Coj9ER.mobIbJqBbS5P3tWXbE55vNGFbPM2uwy', 1, 10, 1),
(9, 'goodboy', '$2a$10$KwFLL9FE5oAf4yzQ9tEUEugL5SWtfr.AGwAh/UZESShVHjn8oOGcK', 0, 0, 0),
(10, 'rahim1', '$2a$10$rKmZMkdlbbZiRXKT9jvFv.zMhKHX9QdJXonuJIfIY8DsJTwazNjs6', 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `currentmember`
--
ALTER TABLE `currentmember`
  ADD PRIMARY KEY (`cmId`);

--
-- Indexes for table `problem`
--
ALTER TABLE `problem`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `seniors`
--
ALTER TABLE `seniors`
  ADD PRIMARY KEY (`seniorsId`);

--
-- Indexes for table `sessiontbl`
--
ALTER TABLE `sessiontbl`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `currentmember`
--
ALTER TABLE `currentmember`
  MODIFY `cmId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `problem`
--
ALTER TABLE `problem`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seniors`
--
ALTER TABLE `seniors`
  MODIFY `seniorsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
