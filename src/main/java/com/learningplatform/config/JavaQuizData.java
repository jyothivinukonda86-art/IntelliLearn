package com.learningplatform.config;

import com.learningplatform.config.QuizSeed.QuestionSeed;

public class JavaQuizData {

    // ================= CHAPTER 1 =================
    public static QuizSeed getCh1Easy() {
        return new QuizSeed(
                "Java Ch 1: Fundamentals (Easy)",
                "Basic Java syntax, variables, data types, and simple arithmetic expressions.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("Which keyword is used to declare a constant in Java?",
                                "const", "final", "static", "var",
                                "B", "The 'final' keyword prevents modification of variable values, method overriding, or class inheritance."),
                        new QuestionSeed("What is the default value of a boolean instance variable in Java?",
                                "true", "false", "null", "0",
                                "B", "In Java, instance boolean variables default to false, whereas local variables require explicit initialization."),
                        new QuestionSeed("Which data type is used to store a single 16-bit Unicode character in Java?",
                                "byte", "char", "String", "short",
                                "B", "The 'char' type is a 16-bit unsigned integer representing UTF-16 Unicode code points."),
                        new QuestionSeed("Which operator is used for logical AND in Java?",
                                "&", "&&", "|", "AND",
                                "B", "The '&&' operator evaluates logical AND with short-circuiting behavior."),
                        new QuestionSeed("What is the output of 10 % 3 in Java?",
                                "3", "1", "0", "3.33",
                                "B", "The modulo operator % returns the remainder of integer division; 10 % 3 equals 1.")
                }
        );
    }

    public static QuizSeed getCh1Medium() {
        return new QuizSeed(
                "Java Ch 1: Control Flow & Methods (Medium)",
                "Conditional branches, loop statements, switch expressions, and method parameters.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("Which statement about the 'do-while' loop in Java is true?",
                                "It checks condition before executing body", "It executes body at least once", "It cannot be nested", "It requires a label",
                                "B", "A do-while loop is an exit-controlled loop; the body executes at least once before condition evaluation."),
                        new QuestionSeed("What happens if you omit the 'break' keyword in a classic switch-case in Java?",
                                "Compilation error", "Fall-through to subsequent cases", "Runtime exception", "Loop restarts",
                                "B", "Omitting break causes execution to fall through to subsequent case blocks until a break or end of switch is encountered."),
                        new QuestionSeed("In Java, method arguments are always passed by:",
                                "Reference", "Value", "Pointer", "Name",
                                "B", "Java is strictly pass-by-value. For objects, a copy of the reference is passed by value."),
                        new QuestionSeed("Which primitive type cannot be used in a switch statement?",
                                "int", "char", "float", "short",
                                "C", "Floating-point types (float, double) and boolean cannot be used in switch statements due to precision representation."),
                        new QuestionSeed("What is the effect of the 'continue' keyword inside a loop?",
                                "Terminates the loop", "Skips to the next iteration", "Exits the method", "Restarts the program",
                                "B", "The 'continue' statement skips the remaining statements in the current iteration and evaluates the next loop cycle."),
                        new QuestionSeed("What is the valid declaration for the main method in a Java application?",
                                "public void main(String[] args)", "public static void main(String[] args)", "static void main(String args)", "public static int main(String[] args)",
                                "B", "The JVM entry point signature must be 'public static void main(String[] args)'."),
                        new QuestionSeed("What is the result of byte a = 127; a++; in Java?",
                                "128", "-128", "Compilation error", "0",
                                "B", "Byte is signed 8-bit (-128 to 127). Overflow wraps 127 + 1 to -128.")
                }
        );
    }

    public static QuizSeed getCh1Hard() {
        return new QuizSeed(
                "Java Ch 1: Memory Model & JVM Execution (Hard)",
                "Stack vs heap allocation, widening/narrowing type conversions, bitwise operators, and class loading.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("Where are local primitive variables allocated during Java execution?",
                                "Garbage-collected Heap", "Thread Stack Frame", "Metaspace", "Native Method Area",
                                "B", "Local primitives and method references reside inside stack frames created on the executing thread's call stack."),
                        new QuestionSeed("What is the result of System.out.println(1.0 / 0.0) in Java?",
                                "ArithmeticException", "Infinity", "NaN", "0.0",
                                "B", "Floating-point division by zero in IEEE 754 returns 'Infinity' without throwing ArithmeticException."),
                        new QuestionSeed("Which bitwise operator shifts bits to the right while preserving the sign bit?",
                                ">>", ">>>", "<<", "<<<",
                                "A", "The '>>' operator is the signed right-shift operator which copies the sign bit into high-order positions."),
                        new QuestionSeed("What happens when an expression contains byte b1 = 10; byte b2 = 20; byte b3 = b1 + b2;?",
                                "Compiles successfully", "Compilation error: possible lossy conversion from int to byte", "b3 becomes 30 at runtime", "Runtime ClassCastException",
                                "B", "Binary operators promote byte and short operands to 32-bit int, requiring an explicit cast: (byte)(b1 + b2)."),
                        new QuestionSeed("Which JVM runtime data area is shared among all concurrent application threads?",
                                "Program Counter (PC) Register", "Java Thread Stack", "Heap Memory Area", "Native Method Stack",
                                "C", "The Heap and Metaspace are shared across all threads; PC registers and Stacks are per-thread."),
                        new QuestionSeed("What is the difference between prefix (++i) and postfix (i++) operators?",
                                "No difference", "Prefix increments before returning; postfix returns before incrementing", "Prefix works only on integers", "Postfix is not supported in Java",
                                "B", "++i increments the operand and evaluates to the new value; i++ evaluates to the current value then increments."),
                        new QuestionSeed("What is the purpose of the JIT (Just-In-Time) compiler in the JVM?",
                                "Compiles Java source code to .class bytecode", "Compiles bytecode to native machine code at runtime for hot paths", "Checks syntax errors before launch", "Manages garbage collection",
                                "B", "JIT monitors frequently executed bytecode ('hot spots') and compiles them directly into native CPU instructions."),
                        new QuestionSeed("What is the result of Integer.parseInt(\"1010\", 2) in Java?",
                                "1010", "10", "5", "NumberFormatException",
                                "B", "The second parameter specifies radix 2 (binary); binary 1010 equals decimal 10."),
                        new QuestionSeed("Which of the following is true regarding Java's labeled break statement?",
                                "It can jump to any arbitrary method in the class", "It can terminate an enclosing outer loop block", "It requires goto keyword", "It is only valid in recursion",
                                "B", "A labeled break can exit from any labeled enclosing block or outer loop."),
                        new QuestionSeed("What does the 'strictfp' keyword enforce when applied to a class or method in Java?",
                                "Restricts multi-threaded access", "Forces IEEE 754 floating-point calculations to maintain identical precision across platforms", "Enforces strict type checking at compile time", "Disables garbage collection",
                                "B", "The strictfp keyword restricts floating-point calculations to ensure platform-independent floating-point results.")
                }
        );
    }

    // ================= CHAPTER 2 =================
    public static QuizSeed getCh2Easy() {
        return new QuizSeed(
                "Java Ch 2: OOP Basics (Easy)",
                "Classes, objects, constructors, encapsulation, and basic access control.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("Which access modifier restricts member visibility strictly to the declaring class?",
                                "protected", "public", "private", "default (package-private)",
                                "C", "The 'private' modifier restricts visibility exclusively to members of the enclosing top-level class."),
                        new QuestionSeed("Which keyword is used by a class to inherit from another class in Java?",
                                "implements", "extends", "inherits", "super",
                                "B", "In Java, class inheritance uses the 'extends' keyword; interface implementation uses 'implements'."),
                        new QuestionSeed("What is the default superclass of all classes in Java?",
                                "java.lang.Class", "java.lang.Object", "java.lang.System", "java.lang.Base",
                                "B", "java.lang.Object is the root superclass of every class hierarchy in Java."),
                        new QuestionSeed("Which keyword refers to the current class instance within an instance method?",
                                "this", "super", "self", "me",
                                "A", "The 'this' reference refers to the current object instance executing the method."),
                        new QuestionSeed("What is a constructor's return type in Java?",
                                "void", "Object", "int", "Constructors do not declare a return type",
                                "D", "Constructors have no return type, not even void; declaring a return type turns it into a standard method.")
                }
        );
    }

    public static QuizSeed getCh2Medium() {
        return new QuizSeed(
                "Java Ch 2: Inheritance & Polymorphism (Medium)",
                "Method overriding, dynamic method dispatch, abstract classes, and interfaces.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What is method overriding in Java?",
                                "Defining multiple methods with same name and different parameters", "Subclass providing a specific implementation of a superclass method", "Calling superclass constructors", "Hiding variables in subclasses",
                                "B", "Method overriding occurs when a subclass defines an instance method with identical signature to an inherited method."),
                        new QuestionSeed("Which annotation indicates that a method overrides a superclass method?",
                                "@Inherited", "@Override", "@Overwrite", "@Super",
                                "B", "The @Override annotation causes the compiler to verify that the method actually overrides an inherited method."),
                        new QuestionSeed("Can an interface contain method implementations in Java 8 and later?",
                                "No, interfaces can only declare abstract methods", "Yes, using 'default' or 'static' keywords", "Yes, but only private methods", "No, interfaces were deprecated",
                                "B", "Since Java 8, interfaces can provide concrete default and static method implementations."),
                        new QuestionSeed("What is dynamic method dispatch?",
                                "Resolving overloaded methods at compile time", "Resolving overridden method calls at runtime based on the actual object type", "Dynamically linking C libraries", "Compiling bytecode on the fly",
                                "B", "Dynamic method dispatch is the mechanism by which a call to an overridden method is resolved at runtime."),
                        new QuestionSeed("Can an abstract class have constructors in Java?",
                                "No, abstract classes cannot have constructors", "Yes, called via super() when instantiating subclasses", "Only private constructors", "Only static constructors",
                                "B", "Abstract classes have constructors executed by subclass constructors via super() to initialize inherited fields."),
                        new QuestionSeed("Which collection interface prohibits duplicate elements?",
                                "List", "Queue", "Set", "Map",
                                "C", "The Set interface models mathematical sets and contains no duplicate elements."),
                        new QuestionSeed("What is the time complexity of get(index) in an ArrayList?",
                                "O(1)", "O(n)", "O(log n)", "O(n^2)",
                                "A", "ArrayList is backed by an internal array, providing constant-time O(1) positional index access.")
                }
        );
    }

    public static QuizSeed getCh2Hard() {
        return new QuizSeed(
                "Java Ch 2: Generics & Collections Deep-Dive (Hard)",
                "Type erasure, wildcards, HashMap collision handling, and the equals/hashCode contract.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("How does Java's compiler implement Generics?",
                                "Reified types created in memory", "Type Erasure (replacing type parameters with bounds or Object)", "C++ style template expansion", "Dynamic byte generation for every type",
                                "B", "Java Generics use Type Erasure: compiler removes generic type parameters to ensure backward compatibility with pre-generics bytecode."),
                        new QuestionSeed("In Java 8+, when does a HashMap bucket convert from a LinkedList to a Red-Black Tree?",
                                "When bucket count reaches 4", "When bucket elements reach TREEIFY_THRESHOLD (8) and table capacity >= 64", "Whenever hashCode returns 0", "Never, HashMap only uses linked lists",
                                "B", "When a bucket contains 8 or more entries and the array length is at least 64, it transforms into a red-black tree (TreeBin)."),
                        new QuestionSeed("What happens if two unequal objects return the same hashCode()?",
                                "Compilation error", "A hash collision occurs, handled via chaining/tree bins", "The first object is overwritten", "Runtime HashCollisionException",
                                "B", "Hash collisions are normal; HashMap places both entries in the same bucket and uses equals() to differentiate them."),
                        new QuestionSeed("What does the wildcard <? extends Number> represent in Java generics?",
                                "Upper-bounded wildcard accepting Number or any subclass of Number", "Lower-bounded wildcard accepting Number or its superclasses", "Unbounded wildcard", "Only Number itself",
                                "A", "<? extends T> is an upper-bounded wildcard allowing type T or any of its subtypes (Covariance)."),
                        new QuestionSeed("Which interface must an object implement to be sorted in a TreeSet without an external Comparator?",
                                "java.util.Comparator", "java.lang.Comparable", "java.lang.Cloneable", "java.io.Serializable",
                                "B", "Objects must implement Comparable<T> and provide compareTo() for natural ordering in TreeSet/TreeMap."),
                        new QuestionSeed("What is the difference between fail-fast and fail-safe iterators in Java Collections?",
                                "Fail-fast iterators throw ConcurrentModificationException on structural modification; fail-safe work on copies", "Fail-fast works on copies; fail-safe throws exceptions", "Fail-fast is multi-threaded; fail-safe is single-threaded", "There is no difference",
                                "A", "Fail-fast iterators (ArrayList, HashMap) detect concurrent structural modification; fail-safe (CopyOnWriteArrayList) traverse snapshots."),
                        new QuestionSeed("What is the contract between equals() and hashCode() in Java?",
                                "If a.equals(b) is true, then a.hashCode() MUST equal b.hashCode()", "If a.hashCode() == b.hashCode(), then a.equals(b) MUST be true", "Both must return the memory address", "hashCode() is only used for strings",
                                "A", "The contract mandates that equal objects must produce identical hash codes; unequal objects may produce identical hash codes."),
                        new QuestionSeed("Why is String widely preferred as a HashMap key in Java?",
                                "Strings cannot have hash collisions", "String is immutable and caches its hashCode() calculation", "Strings are automatically synchronized", "Strings take less memory than primitives",
                                "B", "Immutability guarantees key state cannot change after insertion, and cached hashCode avoids repeated computation."),
                        new QuestionSeed("Which collection should be preferred when thread-safe concurrent map operations are needed without locking the entire table?",
                                "Hashtable", "Collections.synchronizedMap()", "ConcurrentHashMap", "LinkedHashMap",
                                "C", "ConcurrentHashMap utilizes segment locking / CAS operations and bucket-level locks for high concurrent throughput."),
                        new QuestionSeed("What happens during the invocation of list.add(10) on a List<Integer>?",
                                "Throws ClassCastException", "Automatic boxing converts primitive int 10 to Integer.valueOf(10)", "Runtime autoboxing error", "Memory leak",
                                "B", "Autoboxing automatically wraps the primitive literal int 10 into an Integer object via Integer.valueOf(10).")
                }
        );
    }

    // ================= CHAPTER 3 =================
    public static QuizSeed getCh3Easy() {
        return new QuizSeed(
                "Java Ch 3: Multithreading Fundamentals (Easy)",
                "Thread creation, thread states, start() vs run(), and basic concurrency concepts.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What happens when you call thread.run() instead of thread.start()?",
                                "Starts a new asynchronous thread", "Executes run() synchronously in the calling thread", "Throws IllegalThreadStateException", "Pauses the JVM",
                                "B", "Calling run() directly executes the method on the current thread; start() creates a new thread in the OS scheduler."),
                        new QuestionSeed("Which interface should be implemented to define a task that returns a result and can throw checked exceptions?",
                                "java.lang.Runnable", "java.util.concurrent.Callable", "java.lang.Thread", "java.util.function.Consumer",
                                "B", "Callable<V> defines call() which returns a generic result and can throw checked exceptions, unlike Runnable.run()."),
                        new QuestionSeed("Which thread state represents a thread actively executing or ready to execute on the CPU?",
                                "WAITING", "BLOCKED", "RUNNABLE", "TIMED_WAITING",
                                "C", "The RUNNABLE state indicates the thread is executing in the JVM or waiting for resource allocation by the OS scheduler."),
                        new QuestionSeed("Which method pauses current thread execution for a specified duration in milliseconds?",
                                "Thread.yield()", "Thread.sleep()", "Thread.stop()", "Thread.wait()",
                                "B", "Thread.sleep(millis) pauses execution for the given duration without releasing any acquired monitor locks."),
                        new QuestionSeed("What is a daemon thread in Java?",
                                "A thread with maximum CPU priority", "A background support thread that does not prevent JVM termination", "A thread that cannot throw exceptions", "A thread that runs on the GPU",
                                "B", "Daemon threads provide background services (like garbage collection); the JVM halts when only daemon threads remain.")
                }
        );
    }

    public static QuizSeed getCh3Medium() {
        return new QuizSeed(
                "Java Ch 3: Concurrency & Synchronization (Medium)",
                "Synchronized blocks, locks, volatile keyword, and Executor framework.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What guarantee does the 'volatile' keyword provide in Java?",
                                "Atomicity for compound operations", "Visibility of writes across CPU caches to other threads", "Mutual exclusion like a lock", "Immutable object state",
                                "B", "The volatile keyword ensures that reads and writes go directly to main memory, preventing thread-local caching and instruction reordering."),
                        new QuestionSeed("Where must wait() and notify() be invoked in Java?",
                                "Anywhere in the code", "Only inside a synchronized block holding the object monitor", "Inside static methods only", "Inside final methods only",
                                "B", "wait() and notify() require ownership of the object monitor, throwing IllegalMonitorStateException otherwise."),
                        new QuestionSeed("What is the primary benefit of ExecutorService over manually creating Threads?",
                                "Guarantees 100% bug-free concurrency", "Thread reuse through pools, resource throttling, and separation of task from execution", "Eliminates all synchronization overhead", "Executes code without JVM",
                                "B", "Thread pools avoid expensive thread creation overhead by reusing workers and managing concurrency queues."),
                        new QuestionSeed("Which class provides atomic increments without using synchronized locks?",
                                "java.lang.Integer", "java.util.concurrent.atomic.AtomicInteger", "java.util.concurrent.Semaphore", "java.lang.VolatileInt",
                                "B", "AtomicInteger uses CPU-level Compare-And-Swap (CAS) instructions to perform lock-free thread-safe updates."),
                        new QuestionSeed("What is the difference between ReentrantLock and synchronized?",
                                "ReentrantLock supports tryLock with timeout, fairness policies, and multiple condition variables", "synchronized is faster in all cases", "ReentrantLock cannot be unlocked", "There is no functional difference",
                                "A", "ReentrantLock offers explicit lock acquisition, non-blocking polling, timed waits, and interruptible locks."),
                        new QuestionSeed("What is a race condition in multi-threaded programming?",
                                "When threads finish at the exact same millisecond", "When multiple threads concurrently access shared data and the outcome depends on execution timing", "When threads run out of stack memory", "When a thread is given highest priority",
                                "B", "A race condition occurs when concurrent threads access mutable shared state without adequate synchronization."),
                        new QuestionSeed("Which synchronization utility permits threads to wait until a set number of operations complete?",
                                "CyclicBarrier", "CountDownLatch", "Phaser", "Exchanger",
                                "B", "CountDownLatch initializes with a count; threads await() until countDown() decrements the counter to zero.")
                }
        );
    }

    public static QuizSeed getCh3Hard() {
        return new QuizSeed(
                "Java Ch 3: Advanced Concurrency & JVM Internals (Hard)",
                "JMM happens-before, CAS operations, ClassLoader hierarchy, Metaspace, and GC mechanics.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("What does the 'happens-before' relationship in the Java Memory Model guarantee?",
                                "Memory actions by one thread are guaranteed to be visible to another thread", "Methods are executed alphabetically", "Garbage collection is delayed", "CPU clock speed is synchronized",
                                "A", "Happens-before defines a partial ordering over memory operations ensuring predictability across threads."),
                        new QuestionSeed("How does the HotSpot JVM manage class metadata since Java 8?",
                                "In the PermGen heap space", "In native memory called Metaspace", "In the CPU L1 cache", "In thread stack frames",
                                "B", "PermGen was replaced by Metaspace in Java 8, which allocates class metadata in off-heap native memory."),
                        new QuestionSeed("What is the primary operational characteristic of the G1 (Garbage-First) Garbage Collector?",
                                "Divides heap into equal-sized regions and prioritizes regions with the most reclaimable space", "Pauses the entire application for hours", "Never executes Stop-The-World phases", "Collects only string objects",
                                "A", "G1 partitions the heap into equal virtual regions and collects regions with the greatest garbage density first."),
                        new QuestionSeed("What is false sharing in concurrent multi-core Java applications?",
                                "Two threads modifying independent variables that happen to share the same CPU cache line", "Two threads accessing different files on disk", "A thread failing to read a volatile variable", "Class loader conflicts between JARs",
                                "A", "False sharing occurs when independent variables reside on the same 64-byte cache line, causing unnecessary cache invalidations across cores."),
                        new QuestionSeed("Which annotation can be placed on fields in Java 8+ to reduce false sharing?",
                                "@VolatileField", "@sun.misc.Contended", "@ThreadSafe", "@AtomicPadded",
                                "B", "@Contended pads variables with empty bytes to isolate them onto separate cache lines."),
                        new QuestionSeed("What is the ABA problem in lock-free algorithms using Compare-And-Swap (CAS)?",
                                "A variable changes from A to B and back to A, deceiving a CAS check that nothing changed", "A thread enters deadlock twice", "Memory leak in survivor spaces", "Alphabetical sorting failure",
                                "A", "CAS checks value equality; if a value cycled A->B->A, CAS succeeds even though intermediate states occurred. Solved by AtomicStampedReference."),
                        new QuestionSeed("Which ClassLoader in Java loads core JDK runtime classes from the bootstrap classpath?",
                                "Application ClassLoader", "Extension ClassLoader", "Bootstrap (Primordial) ClassLoader", "System ClassLoader",
                                "C", "The Bootstrap ClassLoader (written in native C/C++) loads base Java platform classes such as java.lang.Object."),
                        new QuestionSeed("What is the purpose of the ThreadLocal class in Java?",
                                "Provides thread-scoped variables where each thread has an independent copy", "Synchronizes all threads across a cluster", "Prevents memory leaks in garbage collection", "Converts multi-threaded code to single-threaded",
                                "A", "ThreadLocal provides variables accessible only to the thread that set them, commonly used for transaction contexts."),
                        new QuestionSeed("What is the difference between Minor GC and Full GC in Java?",
                                "Minor GC cleans Young Generation; Full GC cleans both Young and Old (Tenured) Generations", "Minor GC cleans Old Gen; Full GC cleans Young Gen", "Minor GC runs only on shutdown", "There is no difference",
                                "A", "Minor GC collects short-lived objects in Eden and Survivor spaces; Full GC stops the world to reclaim the entire heap and Metaspace."),
                        new QuestionSeed("What causes a java.lang.OutOfMemoryError: Java heap space?",
                                "Exceeding the maximum heap size allocated via -Xmx because live objects cannot be garbage collected", "Too many recursive method calls filling the stack", "Missing native C library DLLs", "Deadlock between threads",
                                "A", "Heap OutOfMemoryError occurs when memory allocation requests exceed the configured maximum heap space and GC cannot free space.")
                }
        );
    }
}
