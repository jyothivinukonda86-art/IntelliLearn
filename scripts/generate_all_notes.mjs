import fs from 'fs';
import path from 'path';
import { createPdf } from './pdf_builder.mjs';

const chaptersData = [
  // ===================== JAVA PROGRAMMING =====================
  {
    code: 'java_ch1',
    subject: 'Java Programming',
    chapter: 'Chapter 1: Java Fundamentals & Control Structures',
    detailed: {
      title: 'Java Fundamentals & Control Structures - Detailed Lecture Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Introduction to the Java Platform & Virtual Machine',
          paragraphs: [
            'Java is a high-level, class-based, object-oriented programming language designed with the philosophy of "Write Once, Run Anywhere" (WORA). This cross-platform portability is achieved through the compilation of source code into an intermediate representation known as bytecode, which is executed by the Java Virtual Machine (JVM).',
            'The JVM architecture comprises three primary subsystems: the Class Loader Subsystem, the Runtime Data Areas, and the Execution Engine. The runtime data areas include the Method Area, Heap, JVM Stacks, Program Counter (PC) Registers, and Native Method Stacks.'
          ],
          bullets: [
            'JDK (Java Development Kit): Contains the compiler (javac), documentation tools, and the JRE necessary for software development.',
            'JRE (Java Runtime Environment): Provides libraries, the Java Virtual Machine (JVM), and other components to run Java applications.',
            'JVM (Java Virtual Machine): An abstract computing machine that enables a computer to run Java programs through Just-In-Time (JIT) compilation.'
          ]
        },
        {
          heading: '2. Primitive Data Types, Variables & Type Conversion',
          paragraphs: [
            'Java defines eight primitive data types: byte (8-bit), short (16-bit), int (32-bit), long (64-bit), float (32-bit IEEE 754), double (64-bit IEEE 754), boolean (true/false), and char (16-bit Unicode UTF-16).',
            'Type casting in Java occurs in two modes: Widening Casting (automatic) when converting a smaller type to a larger type size (e.g., int to double), and Narrowing Casting (manual) requiring explicit casts (e.g., (int) myDouble) which may result in data truncation.'
          ],
          bullets: [
            'Primitive types are stored on the call stack for fast execution, whereas objects are allocated on the garbage-collected heap.',
            'Wrapper classes (Integer, Double, Character) enable primitives to be utilized within Java Collections through autoboxing and unboxing.'
          ]
        },
        {
          heading: '3. Control Flow Statements & Decision Structures',
          paragraphs: [
            'Decision making statements include if, if-else, nested if, and switch-case. Modern Java (Java 14+) supports enhanced switch expressions with arrow syntax and multiple case labels.',
            'Looping constructs comprise while (entry-controlled), do-while (exit-controlled, executing at least once), standard for, and enhanced for-each loops iterating over arrays and Iterable collections.'
          ],
          bullets: [
            'break: Immediately terminates the innermost loop or switch construct.',
            'continue: Skips the remainder of the current iteration and jumps to the loop evaluation step.',
            'Labeled breaks and continues allow breaking out of nested outer loops.'
          ]
        },
        {
          heading: '4. Methods, Stack Frames & Scope Rules',
          paragraphs: [
            'In Java, all method arguments are passed strictly by value. When passing an object reference, the reference value itself is copied; thus, mutating the object state affects the caller, but reassigning the reference variable does not alter the caller reference.',
            'Method overloading occurs when multiple methods within the same class share the same identifier but have distinct parameter lists (different arity or types).'
          ]
        }
      ]
    },
    revision: {
      title: 'Java Fundamentals & Control Flow - Quick Revision Cheat Sheet',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Core Architecture Summary',
          bullets: [
            'JDK = JRE + Development Tools (compiler, debugger). JRE = JVM + Standard Core Libraries.',
            'Bytecode (.class) is executed by the JVM interpreter and compiled to native machine code via JIT.',
            'Java is strictly Pass-by-Value for both primitive types and object references.'
          ]
        },
        {
          heading: 'Data Types & Memory Sizes',
          bullets: [
            'byte: 1 byte (-128 to 127) | short: 2 bytes | int: 4 bytes | long: 8 bytes (suffix L)',
            'float: 4 bytes (suffix f) | double: 8 bytes (default decimal) | char: 2 bytes (Unicode) | boolean: 1 bit logical',
            'Widening conversion is automatic; Narrowing requires explicit cast `(targetType) value`.'
          ]
        },
        {
          heading: 'Control Flow Key Rules',
          bullets: [
            'switch works with byte, short, char, int, String, and Enums. Floating point types are NOT supported.',
            'do-while executes the body at least once regardless of condition validity.',
            'Enhanced for loop syntax: `for (ElementType item : collection)`.'
          ]
        },
        {
          heading: 'Important Exam Traps & Best Practices',
          bullets: [
            'Variables declared inside a method (local variables) must be initialized before use; they receive no default values.',
            'Instance variables and static fields are automatically initialized to default values (0, null, false).',
            'String objects in Java are immutable; string concatenation inside intensive loops should use StringBuilder.'
          ]
        }
      ]
    }
  },

  {
    code: 'java_ch2',
    subject: 'Java Programming',
    chapter: 'Chapter 2: Object-Oriented Programming & Collections',
    detailed: {
      title: 'OOP Principles, Interfaces & Collections Framework - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. The Four Pillars of Object-Oriented Programming',
          paragraphs: [
            'Encapsulation: Bundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access using access modifiers (private, protected, public, package-private).',
            'Inheritance: Mechanism where a child class acquires properties and behaviors of a parent class using the "extends" keyword. Java supports single class inheritance to avoid the diamond problem, but permits multiple interface implementation.',
            'Polymorphism: Ability of an object to take many forms. Compile-time polymorphism is achieved through method overloading. Runtime polymorphism is achieved through dynamic method dispatch via method overriding with @Override.',
            'Abstraction: Hiding internal implementation details and exhibiting only essential features using abstract classes and interfaces.'
          ]
        },
        {
          heading: '2. Abstract Classes versus Interfaces',
          paragraphs: [
            'Abstract classes can declare state (instance fields), constructors, and both abstract and concrete methods. They model an "is-a" relationship.',
            'Interfaces define a contract. As of Java 8, interfaces can contain default and static methods. Java 9 introduced private interface methods. Functional interfaces contain exactly one abstract method and can be implemented via Lambda expressions.'
          ],
          bullets: [
            'A class can extend only one abstract class, but can implement unlimited interfaces.',
            'Interface fields are implicitly public, static, and final.'
          ]
        },
        {
          heading: '3. Java Collections Framework Hierarchy',
          paragraphs: [
            'The Collections Framework provides a unified architecture for storing and manipulating groups of objects rooted at Iterable and Collection.',
            'List: An ordered collection allowing duplicates. ArrayList provides O(1) random access backed by a dynamic array. LinkedList provides O(1) insertions at ends backed by a doubly-linked list.',
            'Set: A collection containing no duplicate elements. HashSet provides O(1) average lookup using hash codes. TreeSet guarantees O(log n) ordered navigation using a Red-Black Tree.',
            'Map: An object mapping keys to values with unique keys. HashMap uses an array of buckets with collision resolution via linked lists and balanced trees (TreeBins) when bucket capacity exceeds 8.'
          ]
        }
      ]
    },
    revision: {
      title: 'Java OOP & Collections - Quick Revision Cheat Sheet',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'OOP Quick Summary',
          bullets: [
            'Encapsulation: Private fields + public getters/setters.',
            'Inheritance: `class Dog extends Animal`. `super()` calls parent constructor.',
            'Polymorphism: Parent reference pointing to child object: `Animal a = new Dog(); a.makeSound();`.',
            'Abstraction: `abstract class` for partial implementation; `interface` for pure contracts.'
          ]
        },
        {
          heading: 'Collections Framework Complexity Cheat Sheet',
          bullets: [
            'ArrayList: O(1) random access, O(n) arbitrary insertion/deletion, dynamic growth by 50%.',
            'LinkedList: O(n) search, O(1) insertion at ends, higher memory overhead per node.',
            'HashSet: O(1) lookup, unordered, relies on equals() and hashCode() contract.',
            'TreeSet / TreeMap: O(log n) lookup, sorted by Comparable or Comparator.',
            'HashMap: Key-value pairs, O(1) average lookup, converts buckets to red-black trees at threshold 8.'
          ]
        },
        {
          heading: 'Equals and HashCode Contract',
          bullets: [
            'If two objects are equal according to equals(), their hashCode() MUST be identical.',
            'If two objects have the same hashCode(), they are not necessarily equal (hash collision).',
            'Always override both equals() and hashCode() together when using custom keys in HashMaps or HashSets.'
          ]
        }
      ]
    }
  },

  {
    code: 'java_ch3',
    subject: 'Java Programming',
    chapter: 'Chapter 3: Advanced Multithreading, Concurrency & JVM Internals',
    detailed: {
      title: 'Multithreading, Concurrency & JVM Internals - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Thread Lifecycle & Thread Creation',
          paragraphs: [
            'A thread is a lightweight unit of execution. In Java, threads transition through states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED.',
            'Threads can be created by extending the Thread class or implementing the Runnable / Callable interfaces. Implementing Runnable is preferred because Java does not support multiple inheritance, promoting clean separation of task and execution.'
          ]
        },
        {
          heading: '2. Synchronization, Locks & Java Concurrency Utilities',
          paragraphs: [
            'The synchronized keyword ensures mutual exclusion using an object monitor lock (intrinsic lock). While effective, synchronized blocks can cause thread starvation and lack timeout capabilities.',
            'The java.util.concurrent package provides ReentrantLock, ReadWriteLock, Semaphore, CountDownLatch, and CyclicBarrier for advanced thread coordination.',
            'Atomic classes (AtomicInteger, AtomicReference) leverage hardware Compare-And-Swap (CAS) instructions to achieve non-blocking lock-free thread safety.'
          ],
          bullets: [
            'volatile keyword: Guarantees visibility across CPU caches by reading directly from main memory and preventing instruction reordering.',
            'ExecutorService: Thread pool management abstraction decoupling task submission from thread management (Executors.newFixedThreadPool, newCachedThreadPool).'
          ]
        },
        {
          heading: '3. JVM Memory Model & Garbage Collection Algorithms',
          paragraphs: [
            'The Java Memory Model (JMM) defines how threads interact through memory. The Heap is segregated into Young Generation (Eden, Survivor S0, S1) and Old (Tenured) Generation.',
            'Minor GC collects short-lived objects in Young Gen via the Stop-the-World copying collector. Surviving objects are promoted to Old Gen. Major/Full GC reclaims Old Gen memory.',
            'Modern garbage collectors include G1 GC (Garbage-First), ZGC (low-latency concurrent collector), and Shenandoah GC, designed to keep pause times under 10 milliseconds.'
          ]
        }
      ]
    },
    revision: {
      title: 'Multithreading & JVM Internals - Quick Revision Notes',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Thread States & Lifecycle',
          bullets: [
            'NEW -> RUNNABLE -> BLOCKED/WAITING/TIMED_WAITING -> TERMINATED.',
            'wait(), notify(), notifyAll() must be invoked within a synchronized block on the monitor object.',
            'Thread.sleep(ms) pauses execution without relinquishing lock ownership.'
          ]
        },
        {
          heading: 'Concurrency Keywords Cheat Sheet',
          bullets: [
            'volatile: Guarantees visibility across CPU cores; does NOT guarantee atomicity for compound operations (e.g. i++).',
            'synchronized: Guarantees both mutual exclusion (atomicity) and visibility.',
            'ReentrantLock: Explicit lock supporting tryLock(timeout), fair scheduling, and multiple Condition variables.'
          ]
        },
        {
          heading: 'JVM Memory & Garbage Collection',
          bullets: [
            'Stack stores primitive locals and reference variables; Heap stores all dynamic object allocations.',
            'Young Generation: Eden + Survivor S0/S1. Objects surviving generational thresholds are promoted to Old Gen.',
            'G1 GC divides the heap into equal-sized regions and prioritizes regions with the most reclaimable garbage.'
          ]
        }
      ]
    }
  },

  // ===================== DATABASE MANAGEMENT SYSTEMS =====================
  {
    code: 'dbms_ch1',
    subject: 'Database Management Systems',
    chapter: 'Chapter 1: Relational Model, ER Diagrams & SQL Fundamentals',
    detailed: {
      title: 'Relational Model, ER Diagrams & SQL - Detailed Lecture Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Database Architecture & Three-Schema Architecture',
          paragraphs: [
            'A Database Management System (DBMS) is software designed to store, manage, and retrieve structured data securely and concurrently.',
            'The ANSI-SPARC Three-Schema Architecture provides physical data independence (ability to alter physical storage without changing conceptual schema) and logical data independence (ability to alter conceptual schema without altering user views).',
            'Internal Level: Physical storage structures, indexes, block allocations.',
            'Conceptual Level: Entities, data types, relationships, constraints.',
            'External Level: Individual end-user views and application interfaces.'
          ]
        },
        {
          heading: '2. Entity-Relationship (ER) Modeling',
          paragraphs: [
            'ER modeling visualizes data structures. Entities are real-world objects represented by rectangles. Attributes are properties represented by ellipses (Key attributes underlined, Multivalued in double ellipses, Derived in dashed ellipses).',
            'Relationships connect entities (represented by diamonds) with cardinality constraints: One-to-One (1:1), One-to-Many (1:N), and Many-to-Many (M:N).'
          ],
          bullets: [
            'Strong Entity: Has a primary key and independent existence.',
            'Weak Entity: Cannot be uniquely identified by its own attributes; depends on a strong identifying entity via foreign key and partial discriminator key (dashed underline).'
          ]
        },
        {
          heading: '3. SQL Data Definition & Query Language',
          paragraphs: [
            'DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE. These commands define and modify database schema structures and are auto-committed.',
            'DML (Data Manipulation Language): INSERT, UPDATE, DELETE. These manipulate data records and require COMMIT/ROLLBACK.',
            'DQL (Data Query Language): SELECT with WHERE, GROUP BY, HAVING, ORDER BY clauses. The logical processing order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
            'Joins: INNER JOIN returns matching rows; LEFT/RIGHT OUTER JOIN retains unmatched rows from left/right table; FULL OUTER JOIN retains all rows.'
          ]
        }
      ]
    },
    revision: {
      title: 'Relational Model & SQL Fundamentals - Quick Revision Notes',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Key DBMS Definitions',
          bullets: [
            'Primary Key: Unique, non-null identifier for table tuples.',
            'Foreign Key: Attribute enforcing referential integrity by referencing primary key of another table.',
            'Candidate Key: Minimal superkey capable of uniquely identifying tuples.',
            'Superkey: Any set of attributes that uniquely identifies a row in a relation.'
          ]
        },
        {
          heading: 'SQL Query Clause Order',
          bullets: [
            'Syntax Order: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.',
            'Execution Order: FROM -> WHERE (row filter) -> GROUP BY -> HAVING (aggregate filter) -> SELECT -> ORDER BY.',
            'WHERE filters individual rows before aggregation; HAVING filters groups after GROUP BY.'
          ]
        },
        {
          heading: 'Join Types Quick Reference',
          bullets: [
            'INNER JOIN: Intersection of both tables matching join condition.',
            'LEFT JOIN: All rows from left table + matched rows from right table (nulls if no match).',
            'CROSS JOIN: Cartesian product of both tables (size = M * N rows).'
          ]
        }
      ]
    }
  },

  {
    code: 'dbms_ch2',
    subject: 'Database Management Systems',
    chapter: 'Chapter 2: Normalization, Relational Algebra & Indexing',
    detailed: {
      title: 'Normalization, Relational Algebra & Indexing - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Functional Dependencies & Database Anomalies',
          paragraphs: [
            'Unnormalized relational designs suffer from modification anomalies: Insertion Anomalies (cannot insert record without unrelated data), Deletion Anomalies (loss of unintended data when deleting a record), and Update Anomalies (data redundancy leading to inconsistent state).',
            'A functional dependency X -> Y specifies that if two tuples agree on attributes X, they must agree on attributes Y.'
          ]
        },
        {
          heading: '2. Normal Forms (1NF through BCNF)',
          paragraphs: [
            '1NF (First Normal Form): All attribute values must be atomic (no multivalued or composite attributes, unique row identification).',
            '2NF (Second Normal Form): In 1NF and no non-prime attribute is partially dependent on any candidate key (eliminates partial dependency).',
            '3NF (Third Normal Form): In 2NF and no non-prime attribute is transitively dependent on candidate keys. Formally, for X -> Y, either X is a superkey or Y is a prime attribute.',
            'BCNF (Boyce-Codd Normal Form): A stricter version of 3NF. For every non-trivial functional dependency X -> Y, X MUST be a superkey.'
          ]
        },
        {
          heading: '3. Relational Algebra & Database Indexing Structures',
          paragraphs: [
            'Fundamental Relational Algebra operators: Selection (sigma), Projection (pi), Cartesian Product (X), Union (U), Set Difference (-), and Rename (rho).',
            'Database indexing accelerates query lookup. Primary indexes are built on ordered key fields; Clustering indexes on ordered non-key fields; Secondary indexes on unordered fields.',
            'B+ Trees are the industry standard index structure: internal nodes store keys and child pointers, while all data pointers are stored exclusively in leaf nodes linked horizontally as a doubly linked list, optimizing range scans.'
          ]
        }
      ]
    },
    revision: {
      title: 'Normalization & Indexing - Quick Revision Cheat Sheet',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Normal Forms Decision Matrix',
          bullets: [
            '1NF: Atomic values only. No repeating groups.',
            '2NF: 1NF + No partial dependency (non-prime cannot depend on proper subset of candidate key).',
            '3NF: 2NF + No transitive dependency. For X -> Y: X is superkey OR Y is prime attribute.',
            'BCNF: For every dependency X -> Y, X MUST be a superkey (no exceptions for prime attributes).'
          ]
        },
        {
          heading: 'Relational Algebra Operators',
          bullets: [
            'Selection (sigma): Filters tuples (rows). Example: sigma_{salary > 50000}(Employee).',
            'Projection (pi): Extracts specific attributes (columns). Example: pi_{name, role}(Employee).',
            'Natural Join (bowtie): Equijoin on all common attribute names followed by projection.'
          ]
        },
        {
          heading: 'B-Tree versus B+ Tree Indexing',
          bullets: [
            'B-Tree stores data pointers in both internal and leaf nodes.',
            'B+ Tree stores data pointers ONLY in leaf nodes; leaves are linked for O(log n) + range scan performance.',
            'B+ Tree internal nodes hold more keys per disk block, resulting in lower tree height and fewer disk I/O operations.'
          ]
        }
      ]
    }
  },

  {
    code: 'dbms_ch3',
    subject: 'Database Management Systems',
    chapter: 'Chapter 3: Transaction Processing, Concurrency Control & Recovery',
    detailed: {
      title: 'Transactions, Concurrency Control & Recovery - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Transactions & The ACID Properties',
          paragraphs: [
            'A transaction is a logical unit of database processing that includes one or more database access operations. To maintain database consistency, transactions must adhere to ACID properties:',
            'Atomicity: "All or nothing" execution guaranteed by the Transaction Manager and recovery system.',
            'Consistency: Preserves database integrity constraints from one valid state to another.',
            'Isolation: Intermediate transaction states are hidden from concurrently executing transactions, managed by Concurrency Control.',
            'Durability: Committed updates persist permanently even in the event of system crashes or power failures.'
          ]
        },
        {
          heading: '2. Serializability & Concurrency Control Anomalies',
          paragraphs: [
            'Concurrent transaction execution without isolation introduces anomalies: Dirty Reads (reading uncommitted data), Non-repeatable Reads (different reads within same transaction), and Phantom Reads (new rows inserted during range queries).',
            'Conflict Serializability: A schedule is conflict serializable if it can be transformed into a serial schedule by swapping non-conflicting adjacent operations. Tested via Precedence Graph (Serialization Graph) where cycles denote non-serializable schedules.'
          ]
        },
        {
          heading: '3. Locking Protocols & Database Recovery',
          paragraphs: [
            'Two-Phase Locking (2PL): Growing Phase (acquiring locks, releasing none) followed by Shrinking Phase (releasing locks, acquiring none). Guarantees conflict serializability.',
            'Strict 2PL: Holds all exclusive locks until commit/abort, preventing cascading rollbacks.',
            'Recovery techniques utilize Write-Ahead Logging (WAL): Log records must be flushed to non-volatile storage before corresponding database disk blocks are written.',
            'ARIES Algorithm implements: Analysis phase (identifies active transactions and dirty pages), Redo phase (repeats history to reconstruct state), and Undo phase (rolls back active uncommitted transactions).'
          ]
        }
      ]
    },
    revision: {
      title: 'Transactions, Concurrency & Recovery - Quick Revision Notes',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'ACID Properties Breakdown',
          bullets: [
            'Atomicity -> Recovery Manager (Rollback / Undo Log).',
            'Consistency -> Application Logic + DBMS Integrity Constraints.',
            'Isolation -> Concurrency Control Manager (Locking / Timestamping).',
            'Durability -> Recovery Manager (Write-Ahead Logging / Redo Log).'
          ]
        },
        {
          heading: 'Isolation Levels & Anomalies',
          bullets: [
            'Read Uncommitted: Suffers Dirty Read, Non-repeatable Read, Phantom Read.',
            'Read Committed: Prevents Dirty Read. Suffers Non-repeatable Read and Phantom Read.',
            'Repeatable Read: Prevents Dirty Read and Non-repeatable Read. May suffer Phantom Read.',
            'Serializable: Prevents all anomalies. Highest isolation and lowest concurrency.'
          ]
        },
        {
          heading: 'Locking Protocols & Serializability',
          bullets: [
            '2PL guarantees conflict serializability, but can still lead to deadlocks.',
            'Strict 2PL releases Exclusive (X) locks ONLY after transaction commit/abort.',
            'Precedence Graph: Edge T1 -> T2 if T1 performs conflicting action before T2. Cycle = NOT serializable.'
          ]
        }
      ]
    }
  },

  // ===================== OPERATING SYSTEMS =====================
  {
    code: 'os_ch1',
    subject: 'Operating Systems',
    chapter: 'Chapter 1: OS Architecture, System Calls & Process Management',
    detailed: {
      title: 'OS Architecture, System Calls & Processes - Detailed Lecture Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Operating System Architecture & Dual-Mode Operation',
          paragraphs: [
            'An Operating System is an intermediary between computer hardware and user applications, providing hardware abstraction and resource multiplexing.',
            'Dual-Mode Operation protects hardware: User Mode (restricted instructions, cannot directly access I/O or kernel memory) and Kernel Mode (privileged instructions executed by CPU). Transitions occur via software interrupts (System Calls) or hardware interrupts.'
          ]
        },
        {
          heading: '2. Process Concept & Process Control Block (PCB)',
          paragraphs: [
            'A process is an active instance of a program in execution. Its address space consists of: Text Segment (compiled code), Data Segment (global/static variables), Heap (dynamically allocated memory), and Stack (local variables, return addresses).',
            'The Process Control Block (PCB) maintains execution context: Process ID (PID), Process State, Program Counter, CPU registers, CPU scheduling info, Memory management info, and I/O status.'
          ],
          bullets: [
            'Process States: New, Ready, Running, Waiting (Blocked), and Terminated.',
            'Context Switch: Storing the state of the active process in its PCB and loading the saved state of the newly scheduled process.'
          ]
        },
        {
          heading: '3. Process Creation, Termination & Inter-Process Communication (IPC)',
          paragraphs: [
            'In Unix-like systems, processes are created using the fork() system call, creating a child duplicate of the parent process. The child receives return value 0, while the parent receives child PID.',
            'Inter-Process Communication mechanisms allow processes to exchange data: Shared Memory (fastest, requires synchronization) and Message Passing (queues, sockets, pipes).'
          ]
        }
      ]
    },
    revision: {
      title: 'OS Architecture & Process Management - Quick Revision Notes',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Dual Mode & System Calls',
          bullets: [
            'Mode Bit: 1 = User Mode; 0 = Kernel Mode.',
            'Privileged instructions (I/O, halt, interrupt enable/disable) can only execute in Kernel Mode.',
            'System Call sequence: User program traps to kernel -> CPU switches mode bit -> Kernel executes handler -> Returns to user mode.'
          ]
        },
        {
          heading: 'Process Memory Layout',
          bullets: [
            'Stack (grows downward): Local variables, function parameters, stack frames.',
            'Heap (grows upward): Dynamic memory allocated via malloc() or new.',
            'Data: Initialized global/static variables. BSS: Uninitialized global/static variables.',
            'Text: Read-only executable binary instructions.'
          ]
        },
        {
          heading: 'Fork & Zombie / Orphan Processes',
          bullets: [
            'fork() returns 0 to child, child PID to parent, and negative on error.',
            'Zombie Process: Child terminated, but parent has not yet invoked wait() to read exit status.',
            'Orphan Process: Parent terminated before child; adopted by init / systemd (PID 1).'
          ]
        }
      ]
    }
  },

  {
    code: 'os_ch2',
    subject: 'Operating Systems',
    chapter: 'Chapter 2: CPU Scheduling, Deadlocks & Synchronization',
    detailed: {
      title: 'CPU Scheduling, Deadlocks & Synchronization - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. CPU Scheduling Algorithms & Metrics',
          paragraphs: [
            'CPU Scheduling allocates CPU time among ready processes to optimize performance metrics: CPU Utilization, Throughput, Turnaround Time (Completion - Arrival), Waiting Time (Turnaround - Burst), and Response Time.',
            'FCFS (First-Come First-Served): Non-preemptive, suffers from Convoy Effect (short processes queue behind long process).',
            'SJF (Shortest Job First): Provably optimal for minimizing average waiting time; preemptive version is Shortest Remaining Time First (SRTF). Requires future burst estimation.',
            'Round Robin (RR): Preemptive time-sharing using a Time Quantum (q). If q is too large, behaves like FCFS; if too small, context switch overhead degrades throughput.'
          ]
        },
        {
          heading: '2. Process Synchronization & Critical Section Problem',
          paragraphs: [
            'The Critical Section is a segment of code where shared resources are accessed. Any valid synchronization solution must satisfy three criteria: Mutual Exclusion, Progress, and Bounded Waiting.',
            'Peterson\'s Algorithm provides a software solution for two processes using flags and turn variables.',
            'Semaphores: Integer variables accessed via atomic operations wait() (P) and signal() (V). Counting semaphores control access to a finite pool of resources; Binary semaphores act as mutex locks.'
          ]
        },
        {
          heading: '3. Deadlocks & The Four Coffman Conditions',
          paragraphs: [
            'A deadlock is a situation where a set of processes are blocked because each holds a resource and waits for another resource held by another process in the set.',
            'The Four Necessary Conditions for Deadlock: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
            'Banker\'s Algorithm: Avoids deadlock by testing safety state before granting resource requests using Allocation, Max, Available, and Need matrices (Need = Max - Allocation).'
          ]
        }
      ]
    },
    revision: {
      title: 'CPU Scheduling, Synchronization & Deadlocks - Quick Revision',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Scheduling Formulas',
          bullets: [
            'Turnaround Time (TAT) = Completion Time - Arrival Time.',
            'Waiting Time (WT) = Turnaround Time - Burst Time.',
            'Response Time = First Time CPU Allocated - Arrival Time.'
          ]
        },
        {
          heading: 'Critical Section Requirements',
          bullets: [
            '1. Mutual Exclusion: At most one process executes inside the critical section.',
            '2. Progress: If no process is in critical section, only processes wishing to enter decide who enters next.',
            '3. Bounded Waiting: Bound exists on number of times other processes can enter before a waiting process enters.'
          ]
        },
        {
          heading: 'Deadlock Prevention & Banker Algorithm',
          bullets: [
            'Deadlock requires: Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait.',
            'Banker Algorithm: Calculates `Need[i][j] = Max[i][j] - Allocation[i][j]`. Safe state if all processes can finish.'
          ]
        }
      ]
    }
  },

  {
    code: 'os_ch3',
    subject: 'Operating Systems',
    chapter: 'Chapter 3: Memory Management, Virtual Memory & File Systems',
    detailed: {
      title: 'Memory Management, Virtual Memory & Storage - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Logical versus Physical Address Space & Paging',
          paragraphs: [
            'Logical addresses are generated by the CPU during execution; Physical addresses are loaded into memory hardware. The Memory Management Unit (MMU) translates logical to physical addresses at runtime.',
            'Paging eliminates external fragmentation by dividing physical memory into fixed-size Frames and logical memory into same-sized Pages. The Page Table translates Page Number (p) to Frame Number (f), maintaining Page Offset (d).',
            'Translation Lookaside Buffer (TLB): A hardware associative cache storing recent page translations to reduce memory access latency.'
          ]
        },
        {
          heading: '2. Virtual Memory & Page Replacement Algorithms',
          paragraphs: [
            'Virtual Memory allows execution of processes that are not completely in physical memory, providing larger addressable memory than physical RAM through Demand Paging.',
            'When a page is accessed that is not in memory (valid-invalid bit is invalid), the MMU triggers a Page Fault interrupt.',
            'Page Replacement Algorithms: FIFO (suffers from Belady\'s Anomaly where more frames increase page faults), Optimal (replaces page not used for longest future duration, theoretical benchmark), and LRU (Least Recently Used, practical approximation using timestamps or stack).'
          ]
        },
        {
          heading: '3. File System Architecture & Disk Scheduling',
          paragraphs: [
            'File systems structure data hierarchically. In Unix, an Inode stores file metadata (permissions, owner, size, timestamps) and direct/indirect block pointers.',
            'Disk scheduling algorithms optimize hard drive arm movement: FCFS, SSTF (Shortest Seek Time First, can cause starvation), SCAN (Elevator algorithm), and C-SCAN (Circular SCAN, provides uniform wait times).'
          ]
        }
      ]
    },
    revision: {
      title: 'Virtual Memory & File Systems - Quick Revision Cheat Sheet',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Paging & TLB Calculations',
          bullets: [
            'Logical address: Page Number (p) + Offset (d). Number of pages = 2^p; Page size = 2^d.',
            'Effective Access Time (EAT) = (TLB_Hit_Ratio * (TLB_Time + Mem_Time)) + ((1 - TLB_Hit_Ratio) * (TLB_Time + 2 * Mem_Time)).',
            'Paging eliminates external fragmentation, but incurs internal fragmentation on the final page frame.'
          ]
        },
        {
          heading: 'Page Replacement Algorithms Comparison',
          bullets: [
            'FIFO: Replaces oldest loaded page. Suffers from Belady\'s Anomaly.',
            'LRU: Replaces page least recently referenced. Free from Belady\'s Anomaly.',
            'Optimal: Replaces page that will not be used for longest time in future. Minimizes page faults.'
          ]
        },
        {
          heading: 'Disk Scheduling Algorithms',
          bullets: [
            'SSTF selects request with minimum seek time from current head position; may starve distant requests.',
            'SCAN sweeps from one end to the other servicing requests; reverses direction at disk boundary.',
            'C-SCAN sweeps in one direction servicing requests, then immediately returns to start without servicing.'
          ]
        }
      ]
    }
  },

  // ===================== SOFTWARE ENGINEERING =====================
  {
    code: 'se_ch1',
    subject: 'Software Engineering',
    chapter: 'Chapter 1: Software Development Life Cycles & Agile Methodologies',
    detailed: {
      title: 'SDLC Models, Agile Scrum & Requirements Engineering - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. Software Development Life Cycle (SDLC) Framework',
          paragraphs: [
            'The Software Development Life Cycle (SDLC) defines a systematic process for building software: Requirements Analysis, System Design, Implementation, Testing, Deployment, and Maintenance.',
            'Waterfall Model: Linear-sequential model suitable when requirements are clear and immutable. Disadvantage: late defect discovery during testing.',
            'Spiral Model: Risk-driven iterative model structured in four quadrants (Determine Objectives, Identify & Resolve Risks, Develop & Test, Plan Next Phase).'
          ]
        },
        {
          heading: '2. Agile Principles & The Scrum Framework',
          paragraphs: [
            'The Agile Manifesto prioritizes: Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; and Responding to change over following a plan.',
            'Scrum is an empirical Agile framework delivering software in fixed-length iterations called Sprints (typically 1-4 weeks).',
            'Scrum Roles: Product Owner (manages backlog priorities), Scrum Master (removes blockers, facilitates process), and Development Team (cross-functional creators).'
          ],
          bullets: [
            'Sprint Planning: Selects Product Backlog Items (PBIs) and defines the Sprint Goal.',
            'Daily Standup: 15-minute sync: What did I do yesterday? What will I do today? What blockers exist?',
            'Sprint Review: Demonstrates working software to stakeholders.',
            'Sprint Retrospective: Team inspects internal processes to identify continuous improvements.'
          ]
        },
        {
          heading: '3. Requirements Engineering & User Story Modeling',
          paragraphs: [
            'Requirements engineering bridges stakeholder needs and technical specifications. Functional Requirements define what the system must do; Non-Functional Requirements define quality attributes (performance, security, scalability, availability).',
            'User Story format: "As a [type of user], I want [an action/goal] so that [a benefit/value]."',
            'INVEST criteria for effective user stories: Independent, Negotiable, Valuable, Estimable, Small, and Testable.'
          ]
        }
      ]
    },
    revision: {
      title: 'SDLC & Agile Scrum - Quick Revision Cheat Sheet',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'SDLC Models Quick Comparison',
          bullets: [
            'Waterfall: Strict sequential flow. Best for fixed, well-understood requirements. High risk of late surprises.',
            'V-Model: Verification and Validation phases pair directly with development phases.',
            'Spiral: Best for high-risk, mission-critical systems. Heavy emphasis on risk analysis.',
            'Agile: Iterative, incremental, welcomes changing requirements through short feedback loops.'
          ]
        },
        {
          heading: 'Scrum Artifacts & Ceremonies',
          bullets: [
            'Artifacts: Product Backlog, Sprint Backlog, Product Increment (Definition of Done).',
            'Ceremonies: Sprint Planning, Daily Standup (15m), Sprint Review (Demo), Sprint Retrospective.',
            'Story Points measure relative complexity; Velocity measures points delivered per sprint.'
          ]
        },
        {
          heading: 'Functional versus Non-Functional Requirements',
          bullets: [
            'Functional: System behavior, business logic (e.g., student can submit quiz, user can login).',
            'Non-Functional: System qualities (e.g., API response < 200ms, 99.9% uptime, GDPR compliance).'
          ]
        }
      ]
    }
  },

  {
    code: 'se_ch2',
    subject: 'Software Engineering',
    chapter: 'Chapter 2: System Architecture, SOLID Principles & Design Patterns',
    detailed: {
      title: 'System Architecture, SOLID Principles & GoF Patterns - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. The SOLID Principles of Object-Oriented Design',
          paragraphs: [
            'Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.',
            'Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.',
            'Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.',
            'Interface Segregation Principle (ISP): Clients should not be forced to depend upon interfaces they do not use (prefer small, role-specific interfaces).',
            'Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).'
          ]
        },
        {
          heading: '2. Gang of Four (GoF) Design Patterns',
          paragraphs: [
            'Creational Patterns: Deal with object creation mechanisms.',
            'Singleton: Ensures a class has only one instance and provides a global point of access.',
            'Factory Method: Defines an interface for creating an object, deferring instantiation to subclasses.',
            'Builder: Separates the construction of a complex object from its representation.',
            'Structural Patterns: Deal with object composition.',
            'Adapter: Converts the interface of a class into another interface clients expect.',
            'Decorator: Dynamically attaches additional responsibilities to an object.',
            'Behavioral Patterns: Deal with algorithms and communication between objects.',
            'Observer: Defines a one-to-many dependency so that when one object changes state, all dependents are notified.',
            'Strategy: Defines a family of algorithms, encapsulates each, and makes them interchangeable at runtime.'
          ]
        },
        {
          heading: '3. Architectural Styles & Modularity',
          paragraphs: [
            'Monolithic Architecture: Unified single codebase deploying all application tiers together. Simple initial development, but challenges in scaling independent modules.',
            'Microservices Architecture: Collection of small, autonomous, independently deployable services communicating over lightweight protocols (REST, gRPC, message queues). Promotes polyglot tech stacks and fault isolation.'
          ]
        }
      ]
    },
    revision: {
      title: 'SOLID Principles & Design Patterns - Quick Revision Notes',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'SOLID Acronym Breakdown',
          bullets: [
            'S (Single Responsibility): One job per class.',
            'O (Open/Closed): Extend behavior via inheritance/interfaces, do not edit tested classes.',
            'L (Liskov Substitution): Child class must honor all parent contracts without throwing unexpected exceptions.',
            'I (Interface Segregation): Split fat interfaces into fine-grained interfaces.',
            'D (Dependency Inversion): Inject dependencies as interfaces (Inversion of Control / DI).'
          ]
        },
        {
          heading: 'GoF Design Patterns Quick Lookup',
          bullets: [
            'Singleton: Private constructor + static getInstance(). Used for thread pools, caches, loggers.',
            'Factory: Encapsulates object instantiation logic behind a common interface.',
            'Adapter: Wrapper enabling incompatible interfaces to collaborate.',
            'Observer: Publisher-subscriber pattern used in event-driven systems and UI listeners.',
            'Strategy: Injects interchangeable algorithms (e.g., PaymentStrategy: PayPal, Stripe, Crypto).'
          ]
        }
      ]
    }
  },

  {
    code: 'se_ch3',
    subject: 'Software Engineering',
    chapter: 'Chapter 3: Software Testing, Quality Assurance & DevOps CI/CD',
    detailed: {
      title: 'Testing Strategies, Quality Assurance & DevOps CI/CD - Detailed Notes',
      type: 'Detailed Comprehensive Notes',
      sections: [
        {
          heading: '1. The Testing Pyramid & Testing Levels',
          paragraphs: [
            'Software testing verifies that software meets requirements and identifies defects. The Testing Pyramid advocates for a broad base of fast, automated Unit Tests, followed by Integration Tests, and a smaller apex of End-to-End (E2E) UI Tests.',
            'Unit Testing: Validates individual units/functions in isolation, isolating external dependencies using test doubles (mocks, stubs, spies).',
            'Integration Testing: Validates interactions between integrated components (e.g., Spring Boot repository talking to real MySQL database).',
            'System / E2E Testing: Validates the entire integrated system end-to-end against business specifications.'
          ]
        },
        {
          heading: '2. Black-Box versus White-Box Test Design',
          paragraphs: [
            'Black-Box Testing: Tests functionality without knowledge of internal code structure. Techniques include Equivalence Class Partitioning (dividing inputs into valid/invalid classes) and Boundary Value Analysis (testing extremes: min, min+1, nominal, max-1, max).',
            'White-Box Testing: Tests internal logic, data structures, and control flow. Metrics include Statement Coverage, Branch/Decision Coverage, and Cyclomatic Complexity (McCabe metric: V(G) = E - N + 2P).'
          ]
        },
        {
          heading: '3. Continuous Integration, Continuous Delivery & DevOps',
          paragraphs: [
            'DevOps integrates software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality.',
            'Continuous Integration (CI): Developers merge code into a shared repository frequently; every commit triggers automated builds and unit/integration test suites.',
            'Continuous Delivery (CD): Code is automatically tested, built, and packaged into deployable artifacts (Docker containers) ready for one-click production release.',
            'Continuous Deployment: Every build that passes all automated test gates is automatically released to production environments without human intervention.'
          ]
        }
      ]
    },
    revision: {
      title: 'Software Testing & DevOps CI/CD - Quick Revision Notes',
      type: 'Quick Revision & Exam Cheat Sheet',
      sections: [
        {
          heading: 'Testing Hierarchy & Best Practices',
          bullets: [
            'Unit Tests: Fast, isolated, test single class/method. Best framework: JUnit 5 + Mockito.',
            'Integration Tests: Validate interactions across components/databases. Best: Testcontainers, SpringBootTest.',
            'TDD (Test-Driven Development): Red -> Green -> Refactor cycle.'
          ]
        },
        {
          heading: 'Black-Box vs White-Box Testing',
          bullets: [
            'Equivalence Partitioning: Group inputs where system treats all members identically.',
            'Boundary Value Analysis: Bugs cluster at boundaries (e.g. testing 0, 1, 99, 100, 101).',
            'Cyclomatic Complexity: V(G) = Edges - Nodes + 2. Indicates the number of independent execution paths.'
          ]
        },
        {
          heading: 'DevOps & CI/CD Pipeline Stages',
          bullets: [
            '1. Commit -> 2. Build -> 3. Unit Test -> 4. Static Code Analysis (SonarQube) -> 5. Package (Docker) -> 6. Deploy.',
            'CI ensures bugs are caught within minutes of code submission.',
            'Immutable Infrastructure: Deploying pre-built containers rather than mutating running servers.'
          ]
        }
      ]
    }
  }
];

// Target directories
const frontendDir = path.resolve('frontend/public/notes');
const backendDir = path.resolve('src/main/resources/static/notes');

fs.mkdirSync(frontendDir, { recursive: true });
fs.mkdirSync(backendDir, { recursive: true });

console.log('Generating 24 standard PDF notes files...');

for (const ch of chaptersData) {
  // 1. Detailed Notes PDF
  const detPdf = createPdf(
    ch.detailed.title,
    ch.subject,
    ch.chapter,
    ch.detailed.type,
    ch.detailed.sections
  );
  const detFilename = `${ch.code}_detailed_notes.pdf`;
  fs.writeFileSync(path.join(frontendDir, detFilename), detPdf);
  fs.writeFileSync(path.join(backendDir, detFilename), detPdf);
  console.log(`Generated: ${detFilename} (${detPdf.length} bytes)`);

  // 2. Revision Notes PDF
  const revPdf = createPdf(
    ch.revision.title,
    ch.subject,
    ch.chapter,
    ch.revision.type,
    ch.revision.sections
  );
  const revFilename = `${ch.code}_revision_notes.pdf`;
  fs.writeFileSync(path.join(frontendDir, revFilename), revPdf);
  fs.writeFileSync(path.join(backendDir, revFilename), revPdf);
  console.log(`Generated: ${revFilename} (${revPdf.length} bytes)`);
}

console.log('Successfully generated all 24 PDF files in frontend/public/notes/ and src/main/resources/static/notes/!');
